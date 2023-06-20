import { snow, System, via } from "IL2CPP/IL2CPP";
import GuiCustomBuildup = snow.gui.fsm.smithy.GuiCustomBuildup;

let NO_ELEMENT = snow.data.DataDef.ArmorElementRegistTypes.Max;
let ELEMENT_ARRAY = ["Fire", "Water", "Thunder", "Ice", "Dragon"];
function custom_buildup_description(buildup: snow.data.CustomBuildupResultData): string {
  if (buildup.get_IsDefBounus()) {
    let sign = buildup.get_Value() > 0 ? "+" : "";
    return `${sign}${buildup.get_Value()} Defense`;
  }

  if (buildup.get_RegElement() < NO_ELEMENT) {
    let sign = buildup.get_Value() > 0 ? "+" : "";
    return `${sign}${buildup.get_Value()} ${ELEMENT_ARRAY[buildup.get_RegElement()]} Res`;
  }

  if (buildup.get_IsSlotBonus()) {
    return `+${buildup.get_Value()} Slot`;
  }

  if (buildup.get_IsSkillAddBonus()) {
    let skillData = snow.data.SkillDataManager.getBaseData(buildup.get_PlSkillId());
    return `+1 ${skillData.get_Name()}`;
  }

  if (buildup.get_IsSkillSubBonus()) {
    let skillData = snow.data.SkillDataManager.getBaseData(buildup.get_PlSkillId());
    return `-1 ${skillData.get_Name()}`;
  }
  return `Unrecognized`;
}

// Static data
let locked_slots: boolean[];
let current_inventory_data: snow.data.EquipmentInventoryData;
let buildup_count = 0;
let menu_start_index = 0;

function buildup_data() {
  return current_inventory_data.getArmorData().get_CustomBuildupResult();
}

function remaining_cost(): number {
  let cost = current_inventory_data.getArmorBaseData().get_CustomCost();
  for (let i = 0; i < buildup_count; ++i) {
    if (locked_slots[i]) {
      cost -= buildup_data()[i].get_Cost();
    }
  }
  return cost;
}

function equip_is_craftable_armor(self: GuiCustomBuildup): boolean {
  return (
    !self.get_IsWeapon() &&
    self._PlayerEquipBoxCtrl._EquipBoxGridCursorCtrl.getSelectedEquipInventoryData()._CustomEnable
  );
}

function current_buildup_index(self: GuiCustomBuildup): number | undefined {
  let index = self._CursorCustomTopMenu.getIndex();
  let begin = menu_start_index;
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

function check_valid(armor: snow.data.ArmorData, buildups: System.Array.Generic<snow.data.CustomBuildupResultData>) {
  let base_data = armor.get_BaseData();
  let skill_data = base_data.get_AllSkillDataList();
  let skill_levels: { [skill_id: number]: number; _objTag: "" } = { _objTag: "" };

  for (let i = 0; i < skill_data.get_Count(); ++i) {
    skill_levels[skill_data.get_Item(i).get_EquipSkillId()] = skill_data.get_Item(i).get_TotalLv();
  }

  let budget = base_data.get_CustomCost();
  for (let i = 0; i < buildups.get_Count(); ++i) {
    let buildup = buildups[i];
    budget -= buildup.get_Cost();

    if (buildup.get_IsSkillSubBonus()) {
      let skill = buildup.get_PlSkillId();
      if (skill in skill_levels) {
        if (skill_levels[skill] == 0) {
          return false;
        }
        skill_levels[skill] -= 1;
      }
    }
  }
  if (budget < 0) return false;
  return true;
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

      buildup_count = current_inventory_data.getArmorData().get_CustomBuildupResultNum();

      menu_start_index = self._ListCustomCategory.get_ItemCount();
      let new_count = menu_start_index + buildup_count;

      let cursor_index = 0;
      if (keepCursor) {
        cursor_index = self._ListCustomCategory.get_CursorIndex()
      }
      self._ListCustomCategory["init(System.UInt32, System.UInt32, System.Int32, System.Int32)"](
        new_count,
        new_count,
        cursor_index,
        cursor_index,
      );
      self._ListCustomCategory.set_ItemCount(new_count);
      self._ListCustomCategory.set_ItemMax(new_count);
      self._CursorCustomTopMenu.updateMenuCursorParam(new_count, new_count);
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
        let ui_elem_index = i + menu_start_index;
        let text = items[ui_elem_index]["getObject(System.String, System.Type)"](
          "pnl_MenuList/txt_menu",
          via.gui.Text.T().get_runtime_type()
        ) as via.gui.Text;
        if (!text) {
          continue;
        }
        let buildup = buildup_data()[i];
        let description = custom_buildup_description(buildup);

        text.set_Message(`${description} [${buildup.get_Cost()}]`);
        let panel = items[ui_elem_index]["getObject(System.String, System.Type)"](
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

  let buildupSlot = buildup_data()[buildup_index];
  self._TextDetailWindowMenu.set_Message(`Lock qurious slot`);
  self._TextDetailWindowExplain.set_Message(
    `Currently in slot: ${custom_buildup_description(buildupSlot)}
Available Budget: ${remaining_cost()}`
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
      cost *= -1;
    }
    if (cost < remaining_cost()) {
      locked_slots[buildup_index] = !locked_slots[buildup_index];
    }

    self.updateMaterialListWindow();
    self.updateDetailWindowBySelectTopMenu();
    self.updateTopMenu();
    return sdk.PreHookResult.SKIP_ORIGINAL;
  }
});

sdk.hook(snow.data.CustomBuildupModule.getArmorMaterialData, undefined, (retval) => {
  if (locked_slots) {
    let param = sdk.to_managed_object(retval);
    param = param.MemberwiseClone() as typeof param;
    let addCost = 0;
    for (let b of locked_slots) {
      if (b) {
        if (addCost == 0) addCost = 10;
        addCost *= 2;
      }
    }
    param._MaterialCategoryNum += addCost;
    param._MaterialCategoryNum_Def += addCost;
    param._MaterialCategoryNum_Skill += addCost;
    param._MaterialCategoryNum_Slot += addCost;
    return sdk.to_ptr(param);
  }
  return retval;
});

// If buildups are locked in, the locked slots are now at the start, so move them there
sdk.hook(snow.data.EquipmentInventoryData.copy, (args) => {
  let self =  sdk.to_managed_object(args[1])
  log.info(`equipment copy self:${self} current:${current_inventory_data}`);
  if (self == current_inventory_data) {
    log.info(`move locked slots to beginning`)
    let new_locked_slots = []
    for (let b of locked_slots) {
      if (b) new_locked_slots.push(true);
    }
    while (new_locked_slots.length < 7) {
      new_locked_slots.push(false)
    }
    locked_slots = new_locked_slots
  }
});

{
  let recurse_guard = false;

  
  let ret: any;
  sdk.hook(
    snow.data.ArmorCustomBuildupData.createResult,
    (args) => {
      if (recurse_guard) {
        return;
      }
      recurse_guard = true;

      let self = sdk.to_managed_object(args[1]);
      let cost = sdk.to_int64(args[2]) & 0xffff_ffff;
      let slotBlank = sdk.to_int64(args[3]) & 0xffff_ffff;
      let skillList = sdk.to_managed_object(args[4]);
      let buildupType = sdk.to_int64(args[6]) & 0xff;
      let seed = sdk.to_int64(args[7])

      let new_cost = cost;
      let locked_buildups = [];

      // Reduce the slotblank and cost by the locked buildups
      for (let i = 0; i < buildup_count; ++i) {
        if (locked_slots[i]) {
          let buildup = buildup_data()[i];

          if (buildup.get_IsSlotBonus()) {
            slotBlank -= buildup.get_Value();
          }
          new_cost -= buildup.get_Cost();

          locked_buildups.push(buildup);
        }
      }

      let max_slot_count = 7 - locked_buildups.length;
      let result: ReturnType<typeof self.createResult>;
      do {
        // Reroll until we can add the locked slots to the result
        result = self.createResult(new_cost, slotBlank, skillList, false, buildupType, seed);
        if (result.get_Count() == 0) return;
        if (result.get_Count() > max_slot_count) continue;

        // Create a new array of results, fill it with the locked buildups, then the new ones
        let new_result = sdk.create_managed_array(
          result.Get(0).get_type_definition().get_full_name(),
          result.get_Count() + locked_buildups.length
        );
        for (let i = 0; i < locked_buildups.length; ++i) {
          new_result[i] = locked_buildups[i];
        }
        for (let i = 0; i < result.get_Count(); ++i) {
          new_result[i + locked_buildups.length] = result.Get(i);
        }
        result = new_result;
        // Reroll again if the final result is invalid
        if (!check_valid(current_inventory_data.getArmorData(), result)) continue;
        break;
      } while (true);

      recurse_guard = false;
      log.info("found result");
      log.info(`${result.get_Count()}`);
      for (let i = 0; i < result.get_Count(); ++i) {
        log.info(`${custom_buildup_description(result[i])} (${result[i].get_Cost()})`);
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
