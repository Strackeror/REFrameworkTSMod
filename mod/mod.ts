import { snow } from "../IL2CPP/il2cpp";

sdk.hook(snow.player.PlayerWeaponCtrl.start, ([_, self]) => {
  let obj = sdk.to_managed_object(self);
  obj._bodyConstScale = 1.0;
});
