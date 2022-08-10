import { snow } from "IL2CPP/IL2CPP";

// 10 seconds
let MINIMUM_REMAINING_TIME = 10 * 60

sdk.hook(
  snow.access.ObjectPopMarker.eventIntoAccessable,
  (args) => {
    let self = sdk.to_managed_object(args[1])
    if (self._Category != snow.access.ObjectPopMarker.MarkerCategory.AccessTypeCreature) {
      return;
    }

    let player = snow.player.PlayerManager.Instance?.findMasterPlayer();
    if (player.get_HunterWireWildNum() >= 1 && player._HunterWireNumAddTime > MINIMUM_REMAINING_TIME) {
      return;
    }

    let wirebuff = self
      .get_Parent()
      ["getComponent(System.Type)"](
        snow.envCreature.EnvironmentCreatureWireBuff.T().get_runtime_type()
      ) as snow.envCreature.EnvironmentCreatureWireBuff;
    if (wirebuff) {
      wirebuff.noticePopAction(snow.player.PlayerManager.Instance.getMasterPlayerID())
    }
  }
)