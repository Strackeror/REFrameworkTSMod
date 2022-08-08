import { snow } from "IL2CPP/IL2CPP";

sdk.hook(
  snow.access.ObjectPopMarker.eventIntoAccessable,
  (args) => {
    let self = sdk.to_managed_object(args[1])
    if (self._Category != snow.access.ObjectPopMarker.MarkerCategory.AccessTypeCreature) {
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