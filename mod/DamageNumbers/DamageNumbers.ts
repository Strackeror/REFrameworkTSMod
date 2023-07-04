import { snow } from "IL2CPP/IL2CPP";

type CalcInfo = snow.hit.EnemyCalcDamageInfo.AfterCalcInfo_DamageSide;
type DmgInfo = {
  crit: snow.hit.CriticalType;
  elem_dmg: number;
};
let damageInstances: [number, DmgInfo][] = [];

let config = {
  elem: false
}

let arg: CalcInfo | undefined;
sdk.hook(
  snow.enemy.EnemyUtility.getHitUIColorType,
  (args) => {
    arg = sdk.to_managed_object(args[1]);
  },
  (retval) => {
    if (arg == null) {
      return retval;
    }

    let calcParam = arg._CalcParam;
    damageInstances.push([
      arg.get_TotalDamage(),
      { crit: arg.get_CriticalResult(), elem_dmg: arg.get_ElementDamage() },
    ]);
    log.info(json.dump_string(damageInstances));
    let ownerType = calcParam.get_OwnerType();
    if (ownerType != snow.hit.DamageFlowOwnerType.Player && ownerType != snow.hit.DamageFlowOwnerType.PlayerShell) {
      return retval;
    }
    let calcType = calcParam.get_CalcType();
    if (calcType != snow.enemy.EnemyDef.DamageCalcType.Slash && calcType != snow.enemy.EnemyDef.DamageCalcType.Strike) {
      return retval;
    }
    const ColorType = snow.gui.GuiDamageDisp.ColorType;
    if (sdk.to_int64(retval) == ColorType.Gray) {
      return retval;
    }

    if (calcParam.get_PhysicalMeatAdjustRate() > 0.44) {
      return sdk.to_ptr(ColorType.Orange);
    } else {
      return sdk.to_ptr(ColorType.White);
    }
  }
);

let self: snow.gui.GuiDamageDisp.NumDisp
let color_type: snow.gui.GuiDamageDisp.ColorType
sdk.hook(
  snow.gui.GuiDamageDisp.NumDisp.startNumDisp,
  ([, self_ptr, , , , color_type_ptr]) => {
    self = sdk.to_managed_object(self_ptr);
    color_type = sdk.to_int64(color_type_ptr);
  },
  (retval) => {
    let message = self._DamageText.get_Message();
    let text_dmg = Number(message);
    let dmg_index = damageInstances.findIndex(([dmg]) => dmg == text_dmg);
    if (dmg_index < 0) {
      return retval;
    }

    let new_message = "" + message;
    let [, calc_info] = damageInstances.splice(dmg_index, 1)[0];
    if (damageInstances.length > 8) {
      damageInstances = []
    }
    if (calc_info.crit == snow.hit.CriticalType.Critical) {
      new_message += "+";
    }

    if (config.elem) {
      let elem_dmg = calc_info.elem_dmg;
      if (elem_dmg > 0) {
        new_message += `\n(${Math.floor(elem_dmg)})`;
      }
    }


    if (new_message != message) self._DamageText.set_Message(new_message);
    return retval
  }
);
