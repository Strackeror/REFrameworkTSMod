type TypeMap = import("./typemap").TypeMap;
type System_Array<T> = import("./IL2CPP").System.Array.Generic<T>;
type SystemObject = import("./IL2CPP").System.Object;

type Func = (...args: any[]) => any;

declare type TypeName = keyof TypeMap;
declare type REType<T extends TypeName> = TypeMap[T];

declare interface REMethodDefinition<
  T,
  Name extends keyof T,
  F extends Func = T[Name] extends Func ? T[Name] : never
> {
  (self: T, ...args: Parameters<F>): ReturnType<F>;
  call(self: T, ...args: Parameters<F>): ReturnType<F>;
  get_declaring_type(): RETypeDefinition<T>;
}

declare interface REField<T, Name extends keyof T> {
  get_offset(): number;
  get_name(): Name;
  get_type(): RETypeDefinition<T[Name]>;
  get_declaring_type(): RETypeDefinition<T>;
}

declare interface RETypeDefinition<T> {
  create_instance(simplify: boolean): REManagedObject<T>;
  get_full_name(): string;
  get_name(): string;
  get_method<Name extends keyof T>(name: Name): REMethodDefinition<T, Name>;
  get_field<Name extends keyof T>(name: Name): REField<T, Name>
}

declare type REManagedObject<T> = {
  add_ref: () => REManagedObject<T>;
  release: () => void;
  force_release: () => void;
  get_type_definition: () => RETypeDefinition<T>;
  call<N extends keyof T, F extends Func = T[N] extends Func ? T[N] : never>(
    name: N,
    ...args: Parameters<F>
  ): ReturnType<F>;
} & T;

declare type Ptr<T = any> = {};

type InTypeId<T> = T extends TypeId<infer U, any>
  ? U extends unknown
    ? T
    : U
  : T;

type PtrTuple<T> = {
  [K in keyof T]: Ptr<InTypeId<T[K]>>
};

type First3Elements<T> = T extends [infer E1, infer E2, infer E3, ...any]
  ? [E1, E2, E3]
  : T extends [...any]
  ? T
  : [any, any, any];

type HookFuncBefore<F extends Func> = (
  this: void,
  args: [Ptr<void>, ...First3Elements<PtrTuple<Parameters<F>>>]
) => sdk.PreHookResult | void;

type HookFuncAfter<F extends Func> = (
  this: void,
  retval: Ptr<ReturnType<F>>
) => ReturnType<F> extends void ? void : Ptr<ReturnType<F>>;

/** @noSelf */
declare namespace sdk {
  function get_tdb_version(): number;
  function get_managed_singleton<T extends keyof TypeMap>(
    name: T
  ): REManagedObject<TypeMap[T]>;
  function get_managed_singleton(name: string): REManagedObject<any>;

  function create_instance<T extends keyof TypeMap>(
    name: T
  ): REManagedObject<TypeMap[T]>;

  function find_type_definition<T extends keyof TypeMap>(
    name: T
  ): RETypeDefinition<TypeMap[T]>;
  function find_type_definition(name: string): RETypeDefinition<any>;

  function to_managed_object<T>(ptr: Ptr<T>): REManagedObject<T>;
  function to_managed_object<T>(obj: T): T;

  function to_ptr<T>(obj: T): Ptr<T>;

  function to_float(ptr: Ptr): number;
  function to_int64(ptr: Ptr): number;
  function to_double(ptr: Ptr): number;

  function float_to_ptr(number: number): Ptr<number>;

  function create_managed_array<T extends keyof TypeMap>(
    name: T,
    length: number
  ): REManagedObject<System_Array<TypeMap[T]>>;
  function create_managed_array(
    name: string,
    length: number
  ): REManagedObject<System_Array<any>>;

  function create_managed_string(content: string): REManagedObject<string>;

  function hook<F extends Func>(
    func: F,
    before: HookFuncBefore<F> | undefined,
    after?: HookFuncAfter<F>
  ): void;

  enum PreHookResult {
    CALL_ORIGINAL,
    SKIP_ORIGINAL,
  }
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
