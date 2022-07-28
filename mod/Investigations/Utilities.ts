import { System } from "Investigations/IL2CPP/il2cpp";

export function create_array(
  type: string,
  table: any[]
): System.Array.Generic;
export function create_array<T extends TypeName>(
  type: T,
  table: REType<T>[]
): System.Array.Generic<REType<T>> {
  let array = sdk.create_managed_array(type, table.length);
  for (let i = 0; i < table.length; ++i) {
    array[i] = table[i];
  }
  return array;
}
