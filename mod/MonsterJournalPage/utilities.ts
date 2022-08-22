import { via } from "IL2CPP/IL2CPP";

interface NumberIterable<T> {
  get_Item(idx: number): T;
  get_Count(): number;
}

export function* il_iter<T>(iter:  NumberIterable<T>) {
  for (let i = 0; i < iter.get_Count(); ++i) {
    yield iter.get_Item(i);
  }
}

export function cast<T extends REManagedObject>(obj: REManagedObject, type: RETypeDefinition<T>): T | undefined {
  if (obj.get_type_definition().is_a(type)) {
    return obj as T;
  }
  return undefined;
}

export function getObject<T extends via.gui.PlayObject>(
  ctrl: via.gui.Control | via.gui.GUI,
  path: string,
  type: RETypeDefinition<T>
): T | undefined {
  return ctrl["getObject(System.String, System.Type)"](path, type.get_runtime_type()) as T;
}