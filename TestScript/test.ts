import {snow, System, via} from "../IL2CPP/IL2CPP"

interface Iterable<T> {
  get_Item(i: number): T
  get_Count(): number
}

function* il_iter<T>(obj: Iterable<T>) {
  for (let i = 0; i < obj.get_Count(); ++i) {
    yield obj.get_Item(i);
  }
}

function dump(obj: via.gui.Control, depth = 0) {
  let a = obj["getChildren(System.Type)"](via.gui.PlayObject.T().get_runtime_type())
  let states = obj.get_PlayStateNames()
  let indent = " ".repeat(depth)
  for (let state of il_iter(states)) {
    log.info(indent + state);
  }
  for (let obj of il_iter(a)) {
    log.info(indent + "Obj:" + obj.get_Name() + " Type:" + obj.ToString())
    if (obj.get_type_definition().is_a(via.gui.Control.T())) {
      dump(obj as any, depth + 2)
    }

  }
  for (let i = 0; i < a.get_Count(); ++i) {
  }
}
//dump(snow.gui.GuiManager.Instance.get_refGuiCustomBuildup()._ListCustomCategory)

{
let selectIndex: number;
let self: snow.gui.fsm.itembox.GuiEquipMySet;
sdk.hook(
  snow.gui.fsm.itembox.GuiEquipMySet.setInitialLayout,
  (args) => {
    self = sdk.to_managed_object(args[1])
    let cursor = self._parts.get_ScrLMySet();
    self._parts["<EquipDetailPageCursor>k__BackingField"]
    selectIndex = cursor.get_SelectedIdx();
  },
  (retval) => {
    if (self._parts.get_ScrLMySet().get_SelectedIdx() != selectIndex) {
      self._parts.get_ScrLMySet().setSelectedIdx(selectIndex);
    }
    return retval;
  }
);
}


