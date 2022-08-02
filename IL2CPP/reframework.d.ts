type TypeMap = import("./typemap").TypeMap;
type System_Array<T> = import("./IL2CPP").System.Array.Generic<T>;
type SystemObject = import("./IL2CPP").System.Object;

type Func = (...args: any[]) => any;

declare type TypeName = keyof TypeMap;
declare type REType<T extends TypeName> = TypeMap[T];

declare interface REMethodDefinition<T, F extends Func> {
  (self: T, ...args: Parameters<F>): ReturnType<F>;
  call(self: T, ...args: Parameters<F>): ReturnType<F>;
  get_declaring_type(): RETypeDefinition<T>;
}

declare interface REField<T, Type> {
  get_offset(): number;
  get_name(): string;
  get_type(): RETypeDefinition<Type>;
  get_declaring_type(): RETypeDefinition<T>;
}

declare interface RETypeDefinition<T> {
  create_instance(simplify: boolean): T;
  get_full_name(): string;
  get_name(): string;
  get_method<Name extends keyof T>(
    name: Name
  ): REMethodDefinition<T, T[Name] extends Func ? T[Name] : Func>;
  get_field<Name extends keyof T>(name: Name): REField<T, T[Name]>;
}

declare interface REManagedObject {
  add_ref: () => this;
  release: () => void;
  force_release: () => void;
  get_type_definition: () => RETypeDefinition<this>;
  call<N extends keyof this, F extends Func = this[N] extends Func ? this[N] : never>(
    name: N,
    ...args: Parameters<F>
  ): ReturnType<F>;
}

declare type Ptr<T = any> = {};


type PtrTuple<T> = {
  [K in keyof T]: Ptr<T[K]>
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

  function get_managed_singleton<T extends keyof TypeMap>(name: T): TypeMap[T];
  function get_managed_singleton(name: string): REManagedObject

  function create_instance<T extends keyof TypeMap>(name: T): TypeMap[T];

  function find_type_definition<T extends keyof TypeMap>(
    name: T
  ): RETypeDefinition<TypeMap[T]>;
  function find_type_definition(name: string): RETypeDefinition<any>;

  function to_managed_object<T extends SystemObject>(ptr: Ptr<T>): T;

  function to_ptr<T>(obj: T): Ptr<T>;

  function to_float(ptr: Ptr): number;
  function to_int64(ptr: Ptr): number;
  function to_double(ptr: Ptr): number;

  function float_to_ptr(number: number): Ptr<number>;

  function create_managed_array<T extends keyof TypeMap>(
    name: T,
    length: number
  ): System_Array<TypeMap[T]>;
  function create_managed_array(
    name: string,
    length: number
  ): System_Array<any>;

  function create_managed_string(content: string): REManagedObject;
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
