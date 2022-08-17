import { snow, System, via } from "IL2CPP/IL2CPP";
import GuiCustomBuildup = snow.gui.fsm.smithy.GuiCustomBuildup;

let NO_ELEMENT = snow.data.DataDef.ArmorElementRegistTypes.Max;
let ELEMENT_ARRAY = ["Fire", "Water", "Thunder", "Ice", "Dragon"];
function custom_buildup_description(buildup: snow.data.CustomBuildupResultData): string {
  if (buildup.get_IsDefBounus()) {
    let sign = buildup.get_Value() > 0 ? "+" : "";
    return `Def ${sign}${buildup.get_Value()}`;
  }

  if (buildup.get_RegElement() < NO_ELEMENT) {
    let sign = buildup.get_Value() > 0 ? "+" : "";
    return `${ELEMENT_ARRAY[buildup.get_RegElement()]} Res ${sign}${buildup.get_Value()}`;
  }

  if (buildup.get_IsSlotBonus()) {
    return `Slot +${buildup.get_Value()}`;
  }

  if (buildup.get_IsSkillAddBonus()) {
    let skillData = snow.data.SkillDataManager.getBaseData(buildup.get_PlSkillId());
    return `+${skillData.get_Name()}`;
  }

  if (buildup.get_IsSkillSubBonus()) {
    let skillData = snow.data.SkillDataManager.getBaseData(buildup.get_PlSkillId());
    return `-${skillData.get_Name()}`;
  }
  return `Unrecognized`;
}

// Static data
let locked_slots: boolean[];
let current_inventory_data: snow.data.EquipmentInventoryData;
let buildup_count = 0;


function buildup_data() {
  return current_inventory_data.getArmorData().get_CustomBuildupResult();
}

function remaining_cost(): number {
  let cost = current_inventory_data.getArmorBaseData().get_CustomCost()
  for (let i = 0; i < current_inventory_data.get_CustomCount(); ++i) {
    if (locked_slots[i]) {
      cost -= buildup_data()[i].get_Cost();
    }
  }
  return cost
}

function equip_is_craftable_armor(self: GuiCustomBuildup): boolean {
  return (
    !self.get_IsWeapon() &&
    self._PlayerEquipBoxCtrl._EquipBoxGridCursorCtrl.getSelectedEquipInventoryData()._CustomEnable
  );
}

function current_buildup_index(self: GuiCustomBuildup): number | undefined {
  let index = self._CursorCustomTopMenu.getIndex();
  let begin = 1;
  let end = begin + buildup_count;
  if (index >= begin && index < end) {
    return index - begin;
  }
  return undefined;
}

function check_decide(self: GuiCustomBuildup): boolean {
  self._CursorCustomTopMenu.get_mouseCtrl().checking();
  return (
    snow.Pad.Instance.app.getDecideButtonTrg() ||
    snow.gui.StmGuiInput.getDecideMouseEventTrg(
      self._CursorCustomTopMenu.get_mouseCtrl(),
      snow.gui.StmGuiInput.MouseEventCheckCtrlType.PointingAny,
      0x7fff_ffff
    ) ||
    snow.gui.StmGuiInput.andTrg(snow.StmInputManager.UI_INPUT.CONF_MENU_DECIDE, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false)
  );
}

{
  let self: snow.gui.fsm.smithy.GuiCustomBuildup;
  let keepCursor: boolean;
  sdk.hook(
    snow.gui.fsm.smithy.GuiCustomBuildup.setupTopMenu,
    (args) => {
      self = sdk.to_managed_object(args[1]);
      keepCursor = (sdk.to_int64(args[2]) & 1) == 1;
    },
    (retval) => {
      if (!keepCursor) {
        locked_slots = [false, false, false, false, false, false, false];
      }

      if (!equip_is_craftable_armor(self)) {
        return retval;
      }
      current_inventory_data = self._PlayerEquipBoxCtrl._EquipBoxGridCursorCtrl.getSelectedEquipInventoryData();

      buildup_count = 0
      for (let i = 0; i < 7; ++i) {
        if (buildup_data()[i].get_Id() == 0) {
          break;
        }
        buildup_count += 1
      }

      let new_count = self._ListCustomCategory.get_ItemCount() + buildup_count;
      self._ListCustomCategory["init(System.UInt32, System.UInt32, System.Int32, System.Int32)"](
        new_count,
        new_count,
        0,
        0
      );
      self._ListCustomCategory.set_ItemCount(new_count);
      self._ListCustomCategory.set_ItemMax(new_count);
      self._CursorCustomTopMenu.updateMenuCursorParam(new_count, new_count);
      self._CategoryMenuRemoveIndex += buildup_count;
    }
  );
}

{
  let nextSelf: snow.gui.fsm.smithy.GuiCustomBuildup;
  sdk.hook(
    snow.gui.fsm.smithy.GuiCustomBuildup.updateTopMenu,
    (args) => {
      nextSelf = sdk.to_managed_object(args[1]);
    },
    (retval) => {
      let self = nextSelf;
      if (!equip_is_craftable_armor(self)) {
        return retval;
      }

      let items = self._ListCustomCategory.get_Items();
      for (let i = 0; i < buildup_count; ++i) {
        let text = items[i + 1]["getObject(System.String, System.Type)"](
          "pnl_MenuList/txt_menu",
          via.gui.Text.T().get_runtime_type()
        ) as via.gui.Text;
        if (!text) {
          continue;
        }
        let buildup = buildup_data()[i];
        let description = custom_buildup_description(buildup);

        text.set_Message(`${description} Cost:${buildup.get_Cost()}`);
        let panel = items[i + 1]["getObject(System.String, System.Type)"](
          "pnl_MenuList/pnl_Status",
          via.gui.Panel.T().get_runtime_type()
        ) as via.gui.Panel;
        if (panel) {
          if (locked_slots[i]) {
            panel.set_PlayState("LOCK");
            panel.set_Visible(true);
          } else {
            panel.set_PlayState("DEFAULT");
            panel.set_Visible(false);
          }
        }
        snow.gui.SnowGuiCommonUtility.reqSe(0xf4b6879b);

      }
     }
  );
}

sdk.hook(GuiCustomBuildup.updateDetailWindowBySelectTopMenu, (args) => {
  let self = sdk.to_managed_object(args[1]);
  if (!equip_is_craftable_armor(self)) {
    return;
  }
  let buildup_index = current_buildup_index(self);
  if (buildup_index == undefined) {
    return;
  }

  let buildupSlot = buildup_data()[buildup_index]
  self._TextDetailWindowMenu.set_Message(`Lock qurious slot`);
  self._TextDetailWindowExplain.set_Message(
`Currently in slot: ${custom_buildup_description(buildupSlot)}
Available Cost: ${remaining_cost()}`
    );
  return sdk.PreHookResult.SKIP_ORIGINAL;
});

sdk.hook(GuiCustomBuildup.routineSelectTopMenu, (args) => {
  let self = sdk.to_managed_object(args[1]);
  if (!equip_is_craftable_armor(self)) {
    return;
  }

  let buildup_index = current_buildup_index(self);
  if (buildup_index == undefined) {
    return;
  }

  if (check_decide(self)) {
    // Logic to prevent locking slots that would result into negative costs
    // Sending a negative cost to the rolling function gives invalid results
    let cost = buildup_data()[buildup_index].get_Cost();
    if (locked_slots[buildup_index]) {
      cost *= -1
    }
    if (cost < remaining_cost()) {
      locked_slots[buildup_index] = !locked_slots[buildup_index];
    }

    self.updateMaterialListWindow()
    self.updateDetailWindowBySelectTopMenu();
    self.updateTopMenu();
    return sdk.PreHookResult.SKIP_ORIGINAL;
  }
});

{
  let args;
  sdk.hook(snow.data.CustomBuildupModule.getArmorMaterialData, (a) => {
    args = a;
  },
  (retval) => {
    if (locked_slots) {
      let param = sdk.to_managed_object(retval).MemberwiseClone() as snow.data.CustomBuildupArmorMaterialUserData.Param;
      for (let b of locked_slots) {
        if (b) {
          param._MaterialCategoryNum *= 2;
        }
      }
      return sdk.to_ptr(param);
    }
    return retval;
  });
}

{
  let recurse_guard = false;

  let ret: any;
  sdk.hook(
    snow.data.ArmorCustomBuildupData.createResult,
    (args) => {
      if (recurse_guard) {
        return;
      }
      let self = sdk.to_managed_object(args[1]);
      let cost = sdk.to_int64(args[2]) & 0xffff_ffff;

      let slotBlank = sdk.to_int64(args[3]) & 0xffff_ffff;
      let skillList = current_inventory_data.getArmorBaseData().get_AllSkillDataList();
      // let skillList = sdk.to_managed_object(args[4]);
      

      let final_buildups: {
        [t: number]: snow.data.CustomBuildupResultData;
      } = {};

      let new_cost = cost;
      let minimum_slot_count = 0;
      for (let i = 0; i < skillList.mSize; ++i) {
        log.info(`Armor skill ${i}: ${skillList.get_Item(i).get_Name()} ${skillList.get_Item(i).getLv(9)}`);
      }

      let forbidden_minus_skills: {[skillId: number]: true} = {}
      for (let i = 0; i < buildup_count; ++i) {
        if (locked_slots[i]) {
          log.info(`Locked slot ${i}`);
          let buildup = buildup_data()[i];

          // If a minus skill is locked, forbid it
          if (buildup.get_IsSkillSubBonus()) {
            forbidden_minus_skills[buildup.get_PlSkillId()] = true;
          }

          if (buildup.get_IsSlotBonus()) {
            slotBlank -= buildup.get_Value();
          }

          // Substract cost of the buildup
          new_cost -= buildup.get_Cost();
          final_buildups[i] = buildup;

          // We need at least all the locked slots to be occupied in the result array
          minimum_slot_count = i + 1;
        }
      }

      // We reroll results until we have enough slots to fill everything
      recurse_guard = true;

      let result: ReturnType<typeof self.createResult>;
      do {
        result = self.createResult(new_cost, slotBlank, skillList, false);
        if (result.get_Count() == 0) return;

        let ok = true;
        // Reroll if we have duplicate minus skills
        for (let i = 0; i < result.get_Length(); ++i) {
          if (result[i].get_IsSkillSubBonus() && forbidden_minus_skills[result[i].get_PlSkillId()]) { 
            ok = false;
          }
        }

        // Reroll if we don't have enough slots
        if (result.get_Count() < minimum_slot_count) ok = false;

        if (ok) break;
      } while (true);

      recurse_guard = false;


      let result_count = result.get_Count();

      for (let i of $range(0, result_count - 1)) {
        for (let j of $range(0, result_count - 1)) {
          if (!(j in final_buildups)) {
            final_buildups[j] = result[i];
            break;
          }
        }
      }

      log.info("found result");
      log.info(`${result.get_Count()}`);
      for (let i of $range(0, result_count - 1)) {
        if (i in final_buildups) {
          result[i] = final_buildups[i];
        }
        log.info(`${result[i].get_Id()}, skill: ${result[i].get_PlSkillId()}, ${result[i].ToString()}`);
      }

      ret = sdk.to_ptr(result);
      return sdk.PreHookResult.SKIP_ORIGINAL;
    },
    (retval) => {
      if (ret) {
        let nret = ret;
        ret = undefined;
        return nret;
      }
      return retval;
    }
  );
}
