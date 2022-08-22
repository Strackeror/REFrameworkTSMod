import {snow, System, via} from "../IL2CPP/IL2CPP"
import Arr = System.Array.Generic;

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
}

function to_table(obj: via.gui.Control) {
  let ret = {
    states: [...il_iter(obj.get_PlayStateNames())],
    children: {},
    type: obj.get_type_definition().get_full_name(),
  };
  let children = obj["getChildren(System.Type)"](via.gui.PlayObject.T().get_runtime_type())
  for (let obj of il_iter(children)) {
    
    if (obj.get_type_definition().is_a(via.gui.Control.T())) {
      ret.children[obj.get_Name()] = to_table(obj as any)
      continue;
    }
    ret.children[obj.get_Name()] = {
      type: obj.get_type_definition().get_full_name()
    }
    if (obj.get_type_definition().is_a(via.gui.Text.T())) {
      let text = obj as via.gui.Text;
      ret.children[obj.get_Name()]["message"] = text.get_Message();
      ret.children[obj.get_Name()]["message_At_Id"] = snow.gui.SnowGuiCommonUtility.getMessage(text.get_MessageId());
    }
  }
  return ret;
}

let scrollList = snow.gui.GuiManager.Instance.get_refGuiCommonKeyAssign()._KeyAssignList;
log.info(json.dump_string({ [scrollList.get_Name()]: to_table(scrollList) }));
log.info(`count: ${scrollList.get_ItemCount()} max: ${scrollList.get_ItemMax()}`);

let text = scrollList
  .get_Items()[0]
  ["getObject(System.String, System.Type)"]("txt_assign", via.gui.Text.T().get_runtime_type()) as via.gui.Text; 

let message = ""
for (let i = 1; i < 10; ++i) {
  message += snow.gui.StmGuiInput.getTagMessage(i, false) + `:${i}`;
}
text.set_Message(message);

declare let a: {
  (this: any, n: number): number;
  (this: void, n: number): number;
};

declare let b: {
  a_: typeof a;
}

b.a_(1)