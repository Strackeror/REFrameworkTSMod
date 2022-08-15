import { snow } from "IL2CPP/IL2CPP";

function get_current_target_monsters(): snow.enemy.EnemyDef.EmTypes[] {
  let current_quest = snow.QuestManager.Instance.getActiveQuestData();
  if (!current_quest) {
    return [];
  }

  let data = current_quest.get_RawNormal();
  if (data)
  {
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

  let mystery = current_quest.get_RandomMystery()
  if (mystery)
  {
    let ret: number[] = []
    for (let i = 0; i < mystery._HuntTargetNum; ++i) {
      ret.push(mystery._BossEmType.Get(i));
    }
    return ret;
    
  }
  return [];
}

let current_idx = 0;

sdk.hook(snow.gui.GuiMonsterList.start, (args) => {
  current_idx = 0;
});

sdk.hook(snow.gui.GuiMonsterList.update, (args) => {
  let mon_list = sdk.to_managed_object(args[1]);

  if (
    snow.gui.StmGuiInput.andTrg(
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
    )
  ) {
    let mons = get_current_target_monsters();
    if (mons.length > 0) {
      let mon_to_show = mons[current_idx % mons.length];
      current_idx += 1;
      log.info(`first monster: ${mon_to_show}`);
      for (let i = 0; i < mon_list._MonsterList.mSize; ++i) {
        if (mon_list._MonsterList.get_Item(i)._Data._EmType == mon_to_show) {
          let selected_index =
            mon_list._MonsterListScrollCtrl.get_selectedIndex();
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
