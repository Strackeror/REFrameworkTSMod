import { snow, System } from "IL2CPP/IL2CPP";
import * as ITEM_LIST from "./ItemList.json"

interface Iterable<T> {
  get_Item(i: number): T;
  get_Count(): number;
}

function* il_iter<T>(obj: Iterable<T>) {
  for (let i = 0; i < obj.get_Count(); ++i) {
    yield obj.get_Item(i);
  }
}

function create_array<T>(type: RETypeDefinition<T>, table: T[]) {
  let array = sdk.create_managed_array(type.get_full_name(), table.length);
  for (let i = 0; i < table.length; ++i) {
    array.Set(i, table[i]);
  }
  return array;
}


function argosy_item_list(): number[] {
  let list = snow.facility.TradeCenterFacility.Instance.get_TradeFunc()._TradeUserData._Param;
  let ret: number[] = []
  for (let data of il_iter(list)) {
    ret.push(data._ItemId);
  }
  return ret;
}

function create_item(itemId: number, index: number): snow.data.ItemShopDisplayUserData.Param {
  let item_data = snow.data.ItemShopDisplayUserData.Param.T().create_instance();
  item_data._Id = itemId;
  item_data._SortId = index;
  item_data._FlagIndex = index;
  item_data._IsBargainObject = true;
  item_data._IsUnlockAfterAlchemy = false;
  item_data._HallProgress = 1;
  item_data._VillageProgress = 1;
  item_data._MRProgress = 0;
  return item_data;
}

function addItems(self: snow.data.ItemShopFacility) {

  let count = self._DisplayData._Param.get_Count();
  let data: snow.data.ItemShopDisplayUserData.Param[] = []
  
  for (let id of argosy_item_list()) {
    data.push(create_item(id, count))
    count += 1;
  }
  for (let id of ITEM_LIST.map(n => tonumber(n, 0x10))) {
    data.push(create_item(id, count))
    count += 1;
  }

  self._DisplayData._Param = create_array(snow.data.ItemShopDisplayUserData.Param.T(), [
    ...il_iter(self._DisplayData._Param),
    ...data,
  ]);
}

{
  let self: snow.data.ItemShopFacility;
  sdk.hook(
    snow.data.ItemShopFacility.initialize,
    (args) => {
      self = sdk.to_managed_object(args[1]);
      addItems(self)
    },

  );
}
