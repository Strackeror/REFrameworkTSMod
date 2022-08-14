import { snow, System, via } from "IL2CPP/IL2CPP";
import GuiCustomBuildup = snow.gui.fsm.smithy.GuiCustomBuildup;

function equip_is_craftable_armor(self: GuiCustomBuildup): boolean {
  return (
    !self.get_IsWeapon() &&
    self._PlayerEquipBoxCtrl._EquipBoxGridCursorCtrl.getSelectedEquipInventoryData()
      ._CustomEnable
  );
}

function current_slot_index(self: GuiCustomBuildup): number | undefined {
  let index = self._CursorCustomTopMenu.getIndex();
  if (index >= 1 && index <= 7) {
    return index - 1;
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
    snow.gui.StmGuiInput.andTrg(
      snow.StmInputManager.UI_INPUT.CONF_MENU_DECIDE,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      false,
      false
    )
  );
}

let locked_slots: boolean[];
let current_inventory_data: snow.data.EquipmentInventoryData;
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
      if (!equip_is_craftable_armor(self)) {
        return retval;
      }
      if (!keepCursor) {
        locked_slots = [false, false, false, false, false, false, false];
        current_inventory_data =
          self._PlayerEquipBoxCtrl._EquipBoxGridCursorCtrl.getSelectedEquipInventoryData();
      }
      let newCount = self._ListCustomCategory.get_ItemCount() + 7;
      self._ListCustomCategory[
        "init(System.UInt32, System.UInt32, System.Int32, System.Int32)"
      ](newCount, newCount, 0, 0);
      self._ListCustomCategory.set_ItemCount(newCount);
      self._ListCustomCategory.set_ItemMax(newCount);
      self._CursorCustomTopMenu.updateMenuCursorParam(newCount, newCount);
      self._CategoryMenuRemoveIndex += 7;
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
      for (let i of $range(1, 7)) {
        let item = items[i];
        let text = item["getObject(System.String, System.Type)"](
          "pnl_MenuList/txt_menu",
          via.gui.Text.T().get_runtime_type()
        ) as via.gui.Text;
        if (!text) {
          continue;
        }
        if (locked_slots[i - 1]) {
          text.set_Message(`Unlock qurious slot ${i}`);
        } else {
          text.set_Message(`Lock qurious slot ${i}`);
        }
      }
      self._ListCustomCategory.update;
    }
  );
}

sdk.hook(GuiCustomBuildup.updateDetailWindowBySelectTopMenu, (args) => {
  let self = sdk.to_managed_object(args[1]);
  if (!equip_is_craftable_armor(self)) {
    return;
  }
  let cursorIndex = current_slot_index(self);
  if (cursorIndex == undefined) {
    return;
  }

  let buildupSlot =
    self._PlayerEquipBoxCtrl._EquipBoxGridCursorCtrl.getSelectedEquipInventoryData()
      ._CustomBuildup[cursorIndex];
  self._TextDetailWindowMenu.set_Message(`Lock qurious slot`);
  self._TextDetailWindowExplain.set_Message(
    `Currently in slot: ${buildupSlot?._Id}`
  );
  return sdk.PreHookResult.SKIP_ORIGINAL;
});

sdk.hook(GuiCustomBuildup.routineSelectTopMenu, (args) => {
  let self = sdk.to_managed_object(args[1]);
  if (!equip_is_craftable_armor(self)) {
    return;
  }

  let slotIndex = current_slot_index(self);
  if (slotIndex == undefined) {
    return;
  }

  if (check_decide(self)) {
    locked_slots[slotIndex] = !locked_slots[slotIndex];
    self.updateDetailWindowBySelectTopMenu();
    self.updateTopMenu();
    return sdk.PreHookResult.SKIP_ORIGINAL;
  }
});


{
  let SKILL_MINUS_ID = 149;
  let SLOT_PLUS_1 = 139;
  let SLOT_PLUS_2 = 140;
  let SLOT_PLUS_3 = 141;

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
      let skillList = sdk.to_managed_object(args[4]);

      let final_buildups: {
        [t: number]: snow.data.CustomBuildupResultData;
      } = {};

      let new_cost = cost;
      let armor_data = current_inventory_data.getArmorData();
      let minimum_slot_count = 0;
      for (let i of $range(0, 6)) {
        if (locked_slots[i]) {
          log.info(`Locked slot ${i}`);
          let buildup = armor_data.get_CustomBuildupResult()[i];
          switch (buildup.get_Id()) {
            // If a minus skill is locked, remove it from the skill list
            case SKILL_MINUS_ID:
              for (let i of $range(0, skillList.mSize - 1)) {
                if (
                  skillList.get_Item(i).get_EquipSkillId() ==
                  buildup.get_PlSkillId()
                ) {
                  skillList.RemoveAt(i);
                  break;
                }
              }
              break;

            // If a slot increase is locked, substract its value from the possible blank slots
            case SLOT_PLUS_1:
              slotBlank -= 1;
              break;
            case SLOT_PLUS_2:
              slotBlank -= 2;
              break;
            case SLOT_PLUS_3:
              slotBlank -= 3;
              break;
          }
          // Substract cost of the buildup
          new_cost -= buildup.get_Cost();
          final_buildups[i] = buildup;

          // We need at least all the locked slots to be occupied in the result array
          minimum_slot_count = i + 1;
        }
      }

      // We reroll results until we have enough slots to fill everything
      let result: ReturnType<typeof self.createResult>;
      do {
        recurse_guard = true;
        result = self.createResult(new_cost, slotBlank, skillList, false);
        recurse_guard = false;
      } while (result.get_Count() < minimum_slot_count)

      let result_count = result.get_Count();

      for (let i of $range(0, result_count - 1)) {
        for (let j of $range(0, 6)) {
          if (!(j in final_buildups)) {
            final_buildups[j] = result[i]
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
        log.info(
          `${result[i].get_Id()}, skill: ${result[i].get_PlSkillId()}, ${result[
            i
          ].ToString()}`
        );
      }

      ret = sdk.to_ptr(result);
      return sdk.PreHookResult.SKIP_ORIGINAL;
    },
    (retval) => {
      if (ret) {
        let nret = ret;
        ret = undefined
        return nret;
      }
      return retval;
    }
  );
}
