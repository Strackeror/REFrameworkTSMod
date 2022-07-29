import { snow } from "Investigations/IL2CPP";
import {
  create_investigation,
  generate_quest_data,
  get_monster_name,
  update_quest_no,
} from "Investigations/QuestGenerator";
import QCF = snow.gui.fsm.questcounter.GuiQuestCounterFsmManager;

export interface InvestigationDef {
  map: number;
  target_monster: number;
  extra_monsters: [number, number];
  pinned: boolean;
}
export interface Investigation extends InvestigationDef {
  quest_data: snow.quest.QuestData;
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
    return [];
  }
  if (current_investigation_data.current_player == current_name) {
    return current_investigation_data.investigations;
  }

  current_investigation_data.investigations =
    json.load_file(`Investigations/${current_name}.json`) ?? [];
  for (let inv of current_investigation_data.investigations) {
    inv.quest_data = (generate_quest_data(inv) as REManagedObject<snow.quest.QuestData>).add_ref()
  }
  current_investigation_data.current_player = current_name
  return current_investigation_data.investigations;
}

function save_investigations() {
  const current_name = snow.SnowSaveService.M.Instance?.getCurrentHunterName();
  if (!current_name) {
    return;
  }
  json.dump_file(
    `Investigations/${current_name}.json`,
    current_investigation_data.investigations
  );
}

function get_player_name(): string {
  return (
    snow.SnowSaveService.M.Instance?.getCurrentHunterName() ?? "__Unknown__"
  );
}

let next_returned_text: string | undefined = undefined
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
      return sdk.PreHookResult.SKIP_ORIGINAL
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
  let monster = sdk.to_managed_object(mon);
  let monster_id = monster.get_EnemyType();

  let inv = create_investigation(get_player_name(), monster_id) as Investigation
  if (!inv) {
    log.info(`failed to create investigation for ${monster_id}`)
    return;
  }

  snow.gui.ChatManager.M.Instance?.reqAddChatBossIconInfo(monster_id, "New investigation", false, false)
  inv.quest_data = (generate_quest_data(inv) as REManagedObject<snow.quest.QuestData>).add_ref()
  get_investigations().push(inv)
  save_investigations()
});

sdk.hook(snow.QuestManager.M.makeQuestNoList, undefined, (retval) => {
  let questCounter =
    snow.gui.fsm.questcounter.GuiQuestCounterFsmManager.M.Instance;
  let questManager = snow.QuestManager.M.Instance;

  if (!questCounter || !questManager) {
    return retval
  }

  if (
    questCounter.getQuestCounterSelectedTopMenu() ==
      QCF.QuestCounterTopMenuType.Normal_Hall_Master &&
    questCounter.getQuestCounterSelectedRankMenu() ==
      QCF.QuestCounterRankMenuType.None &&
    questCounter.getQuestCounterSelectedLevelMenu() == 
      QCF.QuestCounterLevelMenuType.Gathering
  ) {
    let list = sdk.to_managed_object(retval)
    let i = 0;
    log.info("adding to list")
    log.info(`${json.dump_string(get_investigations())}`)
    for (let inv of get_investigations()) {
      let new_quest_no = 942000 + i++;
      investigation_id_map[new_quest_no] = inv
      questManager._QuestDataDictionary.Add(new_quest_no, inv.quest_data)
      update_quest_no(inv.quest_data, new_quest_no)
      list.Add(new_quest_no)
    }
    questManager._QuestDataDictionary
  }
  return retval
});
