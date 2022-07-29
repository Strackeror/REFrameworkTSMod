import { snow } from "Investigations/IL2CPP";
import { create_array } from "Investigations/Utilities";
import { Data, EnemyData, MonsterData } from "Investigations/InvestigationData";
import { Investigation, InvestigationDef } from "Investigations/Investigation";

import QuestOrderType = snow.quest.QuestOrderType;

let QuestData = sdk.find_type_definition("snow.quest.QuestData");
let NormalQuestData = sdk.find_type_definition(
  "snow.quest.NormalQuestData.Param"
);
let EnemyQuestData = sdk.find_type_definition(
  "snow.quest.NormalQuestDataForEnemy.Param"
);

function create_base_quest_data() {
  let normal_quest_data = NormalQuestData.create_instance(true);
  {
    normal_quest_data._DbgName = "InvestigationName";
    normal_quest_data._DbgClient = "InvestigationClient";
    normal_quest_data._DbgContent = "InvestigationContent";

    normal_quest_data._QuestNo = 942001;
    normal_quest_data._QuestType = 0;
    normal_quest_data._QuestLv = 5;
    normal_quest_data._EnemyLv = 3;
    normal_quest_data._MapNo = 1;
    normal_quest_data._BaseTime = 11;
    normal_quest_data._TimeVariation = 3;
    normal_quest_data._TimeLimit = 50;
    normal_quest_data._QuestLife = 3; // carts

    normal_quest_data._OrderType = create_array("snow.quest.QuestOrderType", [
      QuestOrderType.M1,
      QuestOrderType.None,
    ]); // Starting conditions

    normal_quest_data._TargetType = create_array(
      "snow.quest.QuestTargetType",
      [0, 0]
    ); // Objectives
    normal_quest_data._TgtEmType = create_array(
      "snow.enemy.EnemyDef.EmTypes",
      [0, 0]
    );
    normal_quest_data._TgtItemId = create_array(
      "snow.data.ContentsIdSystem.ItemId",
      [0x4000000, 0x4000000]
    );
    normal_quest_data._TgtNum = create_array("System.UInt32", [0, 0]);

    normal_quest_data._BossEmType = create_array(
      "snow.enemy.EnemyDef.EmTypes",
      [0, 0, 0, 0, 0, 0, 0]
    );
    normal_quest_data._BossSetCondition = create_array(
      "snow.QuestManager.BossSetCondition",
      [0, 0, 0, 0, 0, 0, 0]
    );
    normal_quest_data._BossSetParam = create_array(
      "System.UInt32",
      [0, 0, 0, 0, 0, 0, 0]
    );

    normal_quest_data._InitExtraEmNum = 0;

    normal_quest_data._SwapEmRate = create_array("System.Byte", [0, 0]);
    normal_quest_data._SwapSetCondition = create_array(
      "snow.QuestManager.SwapSetCondition",
      [0, 0]
    );
    normal_quest_data._SwapSetParam = create_array("System.Byte", [0, 0]);
    normal_quest_data._SwapExitTime = create_array("System.Byte", [0, 0]);
    normal_quest_data._SwapStopType = 0;
    normal_quest_data._SwapStopParam = 0;
    normal_quest_data._SwapExecType = 0;

    normal_quest_data._RemMoney = 0;
    normal_quest_data._RemVillagePoint = 0;
    normal_quest_data._RemRankPoint = 0;

    normal_quest_data._SupplyTbl = 310001;
    normal_quest_data._Icon = create_array(
      "snow.gui.SnowGuiCommonUtility.Icon.EnemyIconFrameForQuestOrder",
      [999, 999, 999, 999, 999]
    );
    normal_quest_data._IsTutorial = false;
    normal_quest_data._IsFromNpc = false;
    normal_quest_data._AutoMatchHR = 20011;
    normal_quest_data._BattleBGMType = 0;
    normal_quest_data._ClearBGMType = 0;
  }

  let enemy_quest_data = EnemyQuestData.create_instance(true);
  {
    enemy_quest_data._EmsSetNo = 34;
    enemy_quest_data._ZakoVital = 130;
    enemy_quest_data._ZakoAttack = 123;
    enemy_quest_data._ZakoParts = 149;
    enemy_quest_data._ZakoOther = 137;
    enemy_quest_data._ZakoMulti = 0;

    enemy_quest_data._RouteNo = create_array(
      "System.Byte",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._PartsTbl = create_array(
      "System.UInt16",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._InitSetName = create_array("System.String", [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
    enemy_quest_data._SubType = create_array(
      "System.Byte",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._VitalTbl = create_array(
      "System.UInt16",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._AttackTbl = create_array(
      "System.UInt16",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._OtherTbl = create_array(
      "System.UInt16",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._StaminaTbl = create_array(
      "System.Byte",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._Scale = create_array(
      "System.Byte",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._ScaleTbl = create_array(
      "snow.enemy.EnemyDef.BossScaleTblType",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._Difficulty = create_array(
      "snow.enemy.EnemyDef.NandoYuragi",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._BossMulti = create_array(
      "System.Byte",
      [0, 0, 0, 0, 0, 0, 0]
    );
    enemy_quest_data._IndividualType = create_array(
      "snow.enemy.EnemyDef.EnemyIndividualType",
      [0, 0, 0, 0, 0, 0, 0]
    );
  }

  let quest_data = QuestData.create_instance(true);
  quest_data.set_RawNormal(normal_quest_data);
  quest_data.set_RawEnemy(enemy_quest_data);
  return quest_data;
}

let elder_dragons = [
  "Teostra",
  "Kushala Daora",
  "Chameleos",
  "Malzeno",
  "Shagaru Magal",
];
function can_capture(monster_data: MonsterData) {
  return elder_dragons.indexOf(monster_data.Name) >= 0;
}

function set_enemy_data(quest_enemy_data: snow.quest.NormalQuestDataForEnemy.Param, enemy_data: EnemyData, index: number) {
  quest_enemy_data._RouteNo.Set(index, enemy_data["_RouteNo"])
  quest_enemy_data._PartsTbl.Set(index, enemy_data["_PartsTbl"])
  quest_enemy_data._InitSetName.Set(index, enemy_data["_InitSetName"])
  quest_enemy_data._SubType.Set(index, enemy_data["_SubType"])
  quest_enemy_data._VitalTbl.Set(index, enemy_data["_VitalTbl"])
  quest_enemy_data._AttackTbl.Set(index, enemy_data["_AttackTbl"])
  quest_enemy_data._OtherTbl.Set(index, enemy_data["_OtherTbl"])
  quest_enemy_data._StaminaTbl.Set(index, enemy_data["_StaminaTbl"])
  quest_enemy_data._Scale.Set(index, enemy_data["_Scale"])
  quest_enemy_data._ScaleTbl.Set(index, enemy_data["_ScaleTbl"])
  quest_enemy_data._Difficulty.Set(index, enemy_data["_Difficulty"])
  quest_enemy_data._BossMulti.Set(index, enemy_data["_BossMulti"])
  quest_enemy_data._IndividualType.Set(index, enemy_data["_IndividualType"])
}

function set_quest_target(
  quest_data: snow.quest.QuestData,
  monster_id: number
) {
  let monster_data = Data.Monsters[monster_id.toString()];
  if (!monster_data) {
    return;
  }

  if (monster_data.MapIds.length == 0) {
    return;
  }

  let normal_quest_data = quest_data.get_RawNormal();
  normal_quest_data._QuestType = snow.quest.QuestType.HUNTING;
  normal_quest_data._TargetType.Set(0, snow.quest.QuestTargetType.Hunting);
  if (!can_capture(monster_data)) {
    (normal_quest_data._QuestType = snow.quest.QuestType.KILL),
      (normal_quest_data._TargetType.Set(0, snow.quest.QuestTargetType.Kill));
  }

  normal_quest_data._TgtEmType.Set(0, monster_data.Id);
  normal_quest_data._TgtNum.Set(0, 1);

  normal_quest_data._BossEmType.Set(0, monster_data.Id);
  normal_quest_data._BossSetCondition.Set(0, 1);
  normal_quest_data._Icon.Set(0, monster_data.Icon);
  normal_quest_data._QuestLv = monster_data.QuestLevel;

  let enemy_quest_data = quest_data.get_RawEnemy();
  let enemy_data = monster_data.EnemyDataList["0"][0]
  set_enemy_data(enemy_quest_data, enemy_data, 0)
}

function set_extra(
  quest_data: snow.quest.QuestData,
  monster_id: number,
  index: number
) {
  let monster_data = Data.Monsters[monster_id.toString()];
  if (!monster_data) {
    return;
  }

  let normal = quest_data.get_RawNormal();
  normal._InitExtraEmNum += 1;

  normal._BossEmType.Set(index, monster_id);
  normal._BossSetCondition.Set(index, 1);

  let enemy_quest_data = quest_data.get_RawEnemy();
  let enemy_data = monster_data.EnemyDataList["0"][0]
  set_enemy_data(enemy_quest_data, enemy_data, index)
}

function set_map(quest_data: snow.quest.QuestData, map_id: number) {
  quest_data.get_RawNormal()._MapNo = map_id;
  quest_data.get_RawEnemy()._EmsSetNo =
    Data.Maps[map_id.toString()].EmsSetNo[0];
}

export function create_investigation(player_name: string, monster_id: number) {
  let monster_data = Data.Monsters[monster_id.toString()];
  if (!monster_data || monster_data.MapIds.length == 0) {
    log.info(`not enough monster data for monster ${monster_id}`)
    return;
  }

  math.randomseed(os.time(), player_name.length ^ string.byte(player_name));

  let pickr = (t: any[]): any => {
    return t[math.random(t.length) - 1];
  };

  let map = pickr(monster_data.MapIds);
  let monsters_in_map = Object.values(Data.Monsters)
    .filter((m) => m.MapIds.indexOf(map) >= 0)
    .map((m) => m.Id);
  let investigation: InvestigationDef = {
    map,
    target_monster: monster_id,
    extra_monsters: [pickr(monsters_in_map), pickr(monsters_in_map)],
    pinned: false,
  };
  return investigation;
}

export function generate_quest_data(
  investigation: InvestigationDef,
): snow.quest.QuestData {
  log.info(
    `generating quest for investigation: ${json.dump_string(investigation)}`
  );
  let quest_data = create_base_quest_data();
  set_map(quest_data, investigation.map);
  set_quest_target(quest_data, investigation.target_monster);
  set_extra(quest_data, investigation.extra_monsters[0], 1);
  set_extra(quest_data, investigation.extra_monsters[1], 2);
  return quest_data;
}

export function update_quest_no(
  quest_data: snow.quest.QuestData,
  quest_no: number
) {
  quest_data.get_RawNormal()._QuestNo = quest_no;
  quest_data.get_RawEnemy()._QuestNo = quest_no;
}

export function get_monster_name(monster_id: number): string {
  return Data.Monsters[monster_id.toString()].Name;
}
