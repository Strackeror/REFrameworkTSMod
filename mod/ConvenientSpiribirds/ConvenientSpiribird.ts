import {snow} from "ConvenientSpiribirds/IL2CPP"
import LvBuffCageId = snow.data.ContentsIdSystem.LvBuffCageId;


let SPIRIBIRD_MULTIPLIER = 2

let player = sdk.get_managed_singleton("snow.player.PlayerManager")
if (!player) {
    let modded_ids: LvBuffCageId[] = []
    sdk.hook(
        sdk.find_type_definition("snow.data.EquipmentInventoryData").get_method("getLvBuffCageData"),
        undefined,
        (retval) => {
            let param = sdk.to_managed_object(retval).downCastAsNormal()._Param
            if (modded_ids.includes(param._Id)) {
                return retval
            }
            modded_ids.push(param._Id)
            let arr = param._StatusBuffAddValue;
            for (let i = 0; i < arr.get_Length(); ++i) {
                log.info(`${param._Id}[${i}]=${arr.get_Item(i)}`)
                arr.Set(i, arr.Get(i) * SPIRIBIRD_MULTIPLIER)
            }

            return retval
        }
    )
}

let next_stamina_max = 0.0
let next_player: snow.player.PlayerQuestBase;
sdk.hook(
  snow.player.PlayerQuestBase.calcLvBuffStamina,
  ([_1, self, cnt]) => {
    let player = sdk.to_managed_object(self);
    let count = sdk.to_int64(cnt);

    next_stamina_max = count * 30.0001;
    next_player = player;
  },

  () => {
    log.info(`calc buff stamina override ${next_stamina_max}`)
    next_player.calcStaminaMax(next_stamina_max, false);
  }
);

export {};