import { create_array } from "./Utilities";

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

    normal_quest_data._OrderType = create_array(
      "snow.quest.QuestOrderType",
      [0x10, 0]
    ); // Starting conditions
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
}

export function create_investigation() {
}