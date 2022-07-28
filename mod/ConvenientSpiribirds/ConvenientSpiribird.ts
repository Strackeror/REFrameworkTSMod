import LvBuffCageId = snow.data.ContentsIdSystem.LvBuffCageId.T;

type Test = System.Array.Generic.T<number>


let SPIRIBIRD_MULTIPLIER = 2

let player = sdk.get_managed_singleton("snow.player.PlayerManager")
if (!player) {
    let modded_ids: LvBuffCageId[] = []
    sdk.hook(
        sdk.find_type_definition("snow.data.EquipmentInventoryData").get_method("getLvBuffCageData"),
        undefined,
        (retval) => {
            let t = sdk.to_managed_object(retval)
            let param = sdk.to_managed_object(retval).downCastAsNormal()._Param
            if (modded_ids.includes(param._Id)) {
                return retval
            }
            modded_ids.push(param._Id)
            let arr = param._StatusBuffAddValue;
            for (let i = 0; i < arr.get_Length(); ++i) {
                log.info(`${param._Id}[${i}]=${arr.get_Item(i)}`)
                arr[i] = arr[i] * SPIRIBIRD_MULTIPLIER;
            }

            return retval
        }
    )
}

let next_stamina_max = 0.0
let next_player: snow.player.PlayerQuestBase.T;
let f = sdk.hook(
  sdk
    .find_type_definition("snow.player.PlayerQuestBase")
    .get_method("calcLvBuffStamina"),
  ([_1, self, cnt]) => {
    let player = sdk.to_managed_object(self);
    let count = sdk.to_int64(cnt);

    next_stamina_max = count * 30;
    next_player = player;
  },

  () => {
    next_player.calcStaminaMax(next_stamina_max, false);
  }
);

export {};