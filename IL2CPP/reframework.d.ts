type TypeMap = import("./typemap").TypeMap;
type System_Array<T> = import("./IL2CPP").System.Array.Generic<T>;
type SystemObject = import("./IL2CPP").System.Object;
type SystemString = import("./IL2CPP").System.String
type SystemType = import("./IL2CPP").System.Type;

type Func = (...args: any[]) => any;
type Static_Func = (this: void, ...args: any[]) => any;

declare type TypeName = keyof TypeMap;
declare type REType<T extends TypeName> = TypeMap[T];

type Methods<T> = { [K in keyof T as T[K] extends Func ? K : never]: T[K] };
type Method<T, N extends keyof Methods<T>> = Methods<T>[N] extends Func
  ? Methods<T>[N]
  : never;

declare interface REMethodDefinition<T, F extends Func> {
  (this: void, self: T, ...args: Parameters<F>): ReturnType<F>;
  call(self: T, ...args: Parameters<F>): ReturnType<F>;
  get_name(): string;
  get_return_type(): RETypeDefinition;
  get_declaring_type(): RETypeDefinition<T>;
  get_num_params(): number;
  get_param_types(): RETypeDefinition[];
  get_param_names(): string[];
  is_static(): boolean;
}

declare interface REField<T, Type> {
  get_offset(): number;
  get_offset_from_base(): number;
  get_offset_from_fieldptr(): number;
  get_name(): string;
  get_type(): RETypeDefinition<Type>;
  get_declaring_type(): RETypeDefinition<T>;
  get_flags(): number;

  is_static(): boolean;
  is_literal(): boolean;

  get_data(obj: T): Type;
}

declare interface RETypeDefinition<T = unknown> {
  create_instance(simplify?: boolean): T;
  get_full_name(): string;
  get_name(): string;
  get_method<Name extends keyof Methods<T>>(
    name: Name
  ): REMethodDefinition<T, Method<T, Name>>;
  get_field<Name extends keyof T>(name: Name): REField<T, T[Name]>;

  get_runtime_type(): SystemType

  is_a(type: string): boolean
  is_a<T>(type: RETypeDefinition<T>): boolean
}


/* Base class for static level functions of the namespace builder */
declare class REFType {
  static T<Type extends REFType>(this: {
    new (...args: any[]): Type;
  }): RETypeDefinition<Type>;
  
}

declare class REManagedObject extends REFType {
  get_address: () => number;

  get_type_definition: () => RETypeDefinition<this>;
  get_object_size: () => number;

  call: (name: string, ...args: any[]) => any;
  get_field: (name: string) => any;
  set_field: (name: string, value: any) => void;

  add_ref: () => this;
  add_ref_permanent: () => this;
  release: () => void;
  force_release: () => void;
  get_reference_count: () => number;

  read_byte: (offset: number) => void;
  read_short: (offset: number) => void;
  read_dword: (offset: number) => void;
  read_qword: (offset: number) => void;
  read_float: (offset: number) => void;
  read_double: (offset: number) => void;
  write_byte: (offset: number, value: number) => void;
  write_short: (offset: number, value: number) => void;
  write_dword: (offset: number, value: number) => void;
  write_qword: (offset: number, value: number) => void;
  write_float: (offset: number, value: number) => void;
  write_double: (offset: number, value: number) => void;
}

// Should just be 'ValueType' but then the name conflicts with the actual object
declare class REValueType extends REFType {
  call: (name: string, ...args: any[]) => any;
  get_field: (name: string) => any;
  set_field: (name: string, value: any) => void;

  address: () => number;
  get_type_definition: () => RETypeDefinition<this>;

  read_byte: (offset: number) => void;
  read_short: (offset: number) => void;
  read_dword: (offset: number) => void;
  read_qword: (offset: number) => void;
  read_float: (offset: number) => void;
  read_double: (offset: number) => void;
  write_byte: (offset: number, value: number) => void;
  write_short: (offset: number, value: number) => void;
  write_dword: (offset: number, value: number) => void;
  write_qword: (offset: number, value: number) => void;
  write_float: (offset: number, value: number) => void;
  write_double: (offset: number, value: number) => void;
}

declare class SystemArray<T = unknown> extends REFType {
  get_size(): number;
  get_element(idx: number): T;
  get_elements(): T[];

  [idx: number]: T extends SystemObject ? T : SystemObject
}

declare class Ptr<T = any> { private __content: T; }

type PtrTuple_<T> = {
  [K in keyof T]: Ptr<T[K]>;
};
type PtrTuple<T> = PtrTuple_<T> extends any[] ? PtrTuple_<T> : [];


type HookFuncBefore<F extends Func> = (
  this: void,
  args: [Ptr<void>, ...PtrTuple<Parameters<F>>]
) => sdk.PreHookResult | void;

type HookFuncAfter<F extends Func> = (
  this: void,
  retval: Ptr<ReturnType<F>>
) => ReturnType<F> extends void ? void : Ptr<ReturnType<F>>;

/** @noSelf */
declare namespace sdk {
  function get_tdb_version(): number;

  function get_managed_singleton(name: string): REManagedObject;

  function create_instance<T extends keyof TypeMap>(name: T): TypeMap[T];
  function find_type_definition(name: string): RETypeDefinition<any>;

  function to_managed_object<T extends SystemObject>(ptr: Ptr<T>): T;

  // Hacky Overload so that we can actually return strings
  function to_ptr(obj: SystemString): Ptr<string>;

  function to_ptr<T>(obj: T): Ptr<T>;

  function to_float(ptr: Ptr<number>): number;
  function to_int64<T extends number>(ptr: Ptr<T>): T;
  function to_int64(ptr: Ptr<boolean>): number;
  function to_double(ptr: Ptr<number>): number;

  function float_to_ptr(number: number): Ptr<number>;

  function create_managed_array(
    name: string,
    length: number
  ): System_Array<any>;

  function create_managed_string(content: string): SystemString;
  function create_sbyte(num: number): REManagedObject
  function create_byte(num: number): REManagedObject
  function create_int16(num: number): REManagedObject
  function create_uint16(num: number): REManagedObject
  function create_int32(num: number): REManagedObject
  function create_uint32(num: number): REManagedObject
  function create_int64(num: number): REManagedObject
  function create_uint64(num: number): REManagedObject
  function create_single(num: number): REManagedObject
  function create_double(num: number): REManagedObject
  
  function hook<F extends REMethodDefinition<any, Static_Func>>(
    func: F,
    before: HookFuncBefore<F> | undefined,
    after?: HookFuncAfter<F>
  ): void;
  
  function hook<F extends Func>(
    func: F,
    before: HookFuncBefore<F> | undefined,
    after?: HookFuncAfter<F>
  ): void;


  enum PreHookResult {
    CALL_ORIGINAL,
    SKIP_ORIGINAL,
  }
  
  // TypeMap specializations
  function get_managed_singleton<T extends keyof TypeMap>(name: T): TypeMap[T];
  function find_type_definition<T extends keyof TypeMap>(
    name: T
  ): RETypeDefinition<TypeMap[T]>;
  function create_managed_array<T extends keyof TypeMap>(
    name: T,
    length: number
  ): System_Array<TypeMap[T]>;
}

/** @noSelf */
declare namespace json {
  function load_file(filepath: string): any;
  function dump_file(filepath: string, value: any, indent?: number): boolean;

  function load_string(json_str: string): any;
  function dump_string(value: any, indent?: number): string;
}

/** @noSelf */
declare namespace log {
  function debug(text: string): void;
  function info(text: string): void;
  function warn(text: string): void;
  function error(text: string): void;
}

/** @noSelf */
declare namespace re {
  function msg(msg: string): void;
}
