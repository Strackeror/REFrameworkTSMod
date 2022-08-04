import { System } from "IL2CPP/IL2CPP";

export function create_array<T extends TypeName>(
  type: T,
  table: REType<T>[]
): System.Array.Generic<REType<T>>;
export function create_array(
  type: string,
  table: any[]
): System.Array.Generic<any>;

export function create_array(type: string, table: any[]): System.Array.Generic {
  let array = sdk.create_managed_array(type, table.length);
  for (let i = 0; i < table.length; ++i) {
    array.Set(i, table[i])
  }
  return array;
}
