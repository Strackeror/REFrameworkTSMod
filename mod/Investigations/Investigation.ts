
sdk.hook(
    sdk.find_type_definition("snow.QuestManager").get_method("questEnemyDie"),
    ([_, self, mon]) => {
        let quest_mgr = sdk.to_managed_object(self)

        if (quest_mgr.getQuestRank_Lv() != 3) {
            return
        }
        quest_mgr._QuestDataDictionary
        let monster = sdk.to_managed_object(mon)
        let monster_id = monster.get_EnemyType()
    }
)

sdk.find_type_definition("snow.QuestManager").get_method("questActivate")

declare namespace A {
    let b: number
    function a(): number
}

