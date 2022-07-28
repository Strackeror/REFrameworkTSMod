import { snow } from "Investigations/IL2CPP";
import {
  create_investigation,
  generate_quest_data,
  get_monster_name,
  update_quest_no,
} from "Investigations/QuestGenerator";
import QCF = snow.gui.fsm.questcounter.GuiQuestCounterFsmManager;

export interface Investigation {
  map: number;
  target_monster: number;
  extra_monster: [number, number];
  pinned: boolean;
  quest_data?: snow.quest.QuestData;
}

let current_investigation_data: {
  current_player: string;
  investigations: Investigation[];
} = { current_player: "", investigations: [] };

let investigation_id_map: {
  [idx: number]: Investigation;
} = {};

function get_investigations(): Investigation[] {
  const current_name = snow.SnowSaveService.M.Instance?.getCurrentHunterName();
  if (!current_name) {
    return;
  }
  if (current_investigation_data.current_player == current_name) {
    return current_investigation_data.investigations;
  }

  current_investigation_data.investigations = json.load_file(
    `Investigations/${current_name}.json`
  );
  for (let i of current_investigation_data.investigations) {
    i.quest_data = generate_quest_data(i);
  }
  return current_investigation_data.investigations;
}

function save_investigations() {
  const current_name = snow.SnowSaveService.M.Instance?.getCurrentHunterName();
  if (!current_name) {
    return;
  }
  json.dump_file(
    `Investigations/${current_name}.json`,
    current_investigation_data
  );
}

let next_returned_text: string = undefined
sdk.hook(
  snow.quest.QuestData.M.getQuestTextCore,
  (args) => {
    let self = sdk.to_managed_object(args[1])
    let quest_text: snow.quest.QuestText = sdk.to_int64(args[2])

    next_returned_text = undefined
    
    let inv = investigation_id_map[self.getQuestNo()]
    if (!inv) {
      return
    }

    switch (quest_text) {
      case snow.quest.QuestText.TITLE:
        next_returned_text = `Investigation: ${get_monster_name(inv.target_monster)}`
        break;
      case snow.quest.QuestText.CLIENT:
        next_returned_text = "Investigator"
        break;
      case snow.quest.QuestText.TARGET:
        next_returned_text = `Hunt a ${get_monster_name(inv.target_monster)}`
        break;
    }

    if (next_returned_text != undefined) {
      return sdk.PreHookresult.SKIP_ORIGINAL
    }
  },

  (retval) => {
    if (next_returned_text) {
      return sdk.to_ptr(sdk.create_managed_string(next_returned_text))
    }
    return retval
  }
)

sdk.hook(snow.QuestManager.M.questEnemyDie, ([_, self, mon]) => {
  let quest_mgr = sdk.to_managed_object(self);

  if (quest_mgr.getQuestRank_Lv() != snow.QuestManager.QuestRank.Master) {
    return;
  }
  quest_mgr._QuestDataDictionary;
  let monster = sdk.to_managed_object(mon);
  let monster_id = monster.get_EnemyType();

  if (snow.QuestManager.M.Instance.getQuestRank_Lv() != snow.QuestManager.QuestRank.Master) {
    return
  }

  let inv = create_investigation(snow.SnowSaveService.M.Instance.getCurrentHunterName(), monster_id)
  if (!inv) {
     return
  }

  inv.quest_data = generate_quest_data(inv)
  get_investigations().push(inv)
  save_investigations()
});

sdk.hook(snow.QuestManager.M.makeQuestNoList, undefined, (retval) => {
  let questCounter =
    snow.gui.fsm.questcounter.GuiQuestCounterFsmManager.M.Instance;
  let questManager = snow.QuestManager.M.Instance;

  if (
    questCounter.getQuestCounterSelectedTopMenu() ==
      QCF.QuestCounterTopMenuType.Normal_Hall_Master &&
    questCounter.getQuestCounterSelectedRankMenu() ==
      QCF.QuestCounterRankMenuType.Master &&
    questCounter.getQuestCounterSelectedLevelMenu() == 
      QCF.QuestCounterLevelMenuType.Gathering
  ) {
    let list = sdk.to_managed_object(retval)
    let i = 0;
    for (let inv of get_investigations()) {
      let new_quest_no = 942000 + i++;
      investigation_id_map[new_quest_no] = inv
      questManager._QuestDataDictionary[new_quest_no] = inv.quest_data
      update_quest_no(inv.quest_data, new_quest_no)
      list.Add(new_quest_no)
    }
    questManager._QuestDataDictionary
    return retval
  }
});
