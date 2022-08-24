import { snow, System, via, void__via_GameObject____via_wwise_RequestInfo____via_string__u32_ } from "IL2CPP/IL2CPP";
import { cast, getObject, il_iter } from "Utils/utilities";

function check_select_tab_pressed(): boolean {
  return snow.gui.StmGuiInput.andTrg(
    snow.StmInputManager.UI_INPUT.STATIC_MENU_ACT_TYPE_CL,
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
  );
}

function check_square_pressed(): boolean {
  return snow.gui.StmGuiInput.andTrg(
    snow.StmInputManager.UI_INPUT.CONF_MENU_ACT_TYPE_RL,
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
  );
}
function get_current_target_monsters(): snow.enemy.EnemyDef.EmTypes[] {
  let current_quest = snow.QuestManager.Instance.getActiveQuestData();
  if (!current_quest) {
    return [];
  }

  let data = current_quest.get_RawNormal();
  if (data) {
    let ret = [];
    if (data._TargetType.Get(0) == snow.quest.QuestTargetType.AllMainEnemy) {
      for (let i = 0; i < data._BossEmType.get_Count(); ++i) {
        let em = data._BossEmType.Get(i);
        if (em != 0) {
          ret.push(data._BossEmType.Get(i));
        }
      }
      return ret;
    }

    for (let i = 0; i < data._TgtEmType.get_Count(); ++i) {
      let em = data._TgtEmType.Get(i);
      if (em != 0) {
        ret.push(data._TgtEmType.Get(i));
      }
    }
    return ret;
  }

  let mystery = current_quest.get_RandomMystery();
  if (mystery) {
    let ret: number[] = [];
    for (let i = 0; i < mystery._HuntTargetNum; ++i) {
      ret.push(mystery._BossEmType.Get(i));
    }
    return ret;
  }
  return [];
}

function get_max_group(mon_list: snow.gui.GuiMonsterList) {
  let monster_info = mon_list.getCurrentMonsterInfo();
  let meat_data = snow.gui.GuiManager.Instance.monsterListParam._MeatInfoDictionary.get_Item(
    monster_info._Data._EmType
  );

  let max_group = 1;
  for (let obj of il_iter(meat_data._MeatContainer)) {
    max_group = Math.max(obj._MeatGroupInfo.get_Count(), max_group);
  }
  return max_group;
}

let current_idx = 0;

sdk.hook(snow.gui.GuiMonsterList.start, (args) => {
  current_idx = 0;
});

sdk.hook(snow.gui.GuiMonsterList.update, (args) => {
  let mon_list = sdk.to_managed_object(args[1]);

  if (check_select_tab_pressed()) {
    let mons = get_current_target_monsters();
    if (mons.length > 0) {
      let mon_to_show = mons[current_idx % mons.length];
      current_idx += 1;
      for (let i = 0; i < mon_list._MonsterList.mSize; ++i) {
        if (mon_list._MonsterList.get_Item(i)._Data._EmType == mon_to_show) {
          let selected_index = mon_list._MonsterListScrollCtrl.get_selectedIndex();
          selected_index._HasValue = true;
          selected_index._Value = i;
          mon_list._MonsterListScrollCtrl.set_selectedIndex(selected_index);

          snow.gui.SnowGuiCommonUtility.reqSe(0xf4b6879b); // sound effect woo

          mon_list.updateTopTab();
          mon_list._MonsterListScrollCtrl.selectedIndexToCursorSelect();
          mon_list.setupMainPage(false, true);
          mon_list.updateMainPage(true);
          return;
        }
      }
    }
  }
});

{
  let self: snow.gui.GuiMonsterList;
  sdk.hook(
    snow.gui.GuiMonsterList.updateKeyAssign,
    (args) => {
      self = sdk.to_managed_object(args[1]);
    },
    () => {
      let assignList = snow.gui.GuiManager.Instance.get_refGuiCommonKeyAssign()._KeyAssignList;
      let text = getObject(assignList.get_Items()[0], "txt_assign", via.gui.Text.T());
      let assign_text = text.get_Message();

      if (self.getMainPageMode() == snow.gui.GuiMonsterList.PageMode.Part && get_max_group(self) > 1) {
        assign_text = "<STM CONF_MENU_ACT_TYPE_RL> Swap State " + assign_text;
      }

      if (get_current_target_monsters().length > 0) {
        assign_text = "<STM STATIC_MENU_ACT_TYPE_CL> Quest Monster " + assign_text;
      }
      text.set_Message(assign_text);
    }
  );
}

let swap_counter = 0;
sdk.hook(snow.gui.GuiMonsterList.updateEmMonsterInput, (args) => {
  let self = sdk.to_managed_object(args[1]);

  if (self.getMainPageMode() != snow.gui.GuiMonsterList.PageMode.Part) {
    return;
  }

  if (check_square_pressed()) {
    swap_counter += 1;
    let monster_info = self.getCurrentMonsterInfo();
    self.updateEmMonsterPartsPage(monster_info, false);
  }
});

{
  let text_names = [
    "txt_slash_number",
    "txt_shock_number",
    "txt_shot_number",
    "txt_fire_number",
    "txt_water_number",
    "txt_ice_number",
    "txt_thunder_number",
    "txt_dragon_number",
  ];

  let message_id: System.Guid;
  let self: snow.gui.GuiMonsterList;
  let last_monster = -1;
  sdk.hook(
    snow.gui.GuiMonsterList.updateEmMonsterPartsPage,
    (args) => {
      self = sdk.to_managed_object(args[1]);

      let monster_info = self.getCurrentMonsterInfo();
      let id = monster_info._Data._EmType;

      if (id != last_monster) {
        swap_counter = 0;
        last_monster = id;
      }
    },
    () => {
      let monster_info = self.getCurrentMonsterInfo();
      let meat_data = snow.gui.GuiManager.Instance.monsterListParam._MeatInfoDictionary.get_Item(
        monster_info._Data._EmType
      );

      let max_group = get_max_group(self);
      let current_group = swap_counter % max_group;

      // Change 'normal' message
      let normal_text = getObject(
        self.guiController.get_Component(),
        "pnl_MonsterList_top/pnl_MonsterList/pnl_MonsterName/txt_nomal",
        via.gui.Text.T()
      );
      if (message_id == undefined) {
        message_id = normal_text.get_MessageId();
      }
      if (current_group == 0) {
        normal_text.set_MessageId(message_id);
      } else {
        normal_text.set_MessageId(System.Guid.Empty);
        normal_text.set_Message(`State ${current_group}`);
      }

      let part_data = (monster_info._Data as snow.data.monsterList.BossMonsterData)._PartTableData;
      let scroll_index = self._MonsterPartListlCtrl._Cursor.get_scrollIndex();
      let part_list = self._MonsterPartListlCtrl._scrL_List.get_Items();

      // Rewrite the hitzone cells
      for (let i = 0; i < part_list.get_Count() - 1; ++i) {
        let current_part = part_data.get_Item(i + scroll_index);
        let current_meat = meat_data._MeatContainer.get_Item(current_part._EmPart);

        for (let j = 0; j < text_names.length; ++j) {
          let text_name = text_names[j];
          let gui_text = getObject(part_list.get_Item(i), text_name, via.gui.Text.T());
          if (current_group >= current_meat._MeatGroupInfo.get_Count()) {
            gui_text.set_Message(" X ");
          } else {
            let value = meat_data.getMeatValue(current_part._EmPart, current_group, j);
            let str = sdk.create_managed_string(`${value}`).add_ref();
            gui_text.set_Message(str as any);
          }
        }
      }
    }
  );
}
