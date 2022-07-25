
type REType = TypeMap[keyof TypeMap]
type RETypeName = keyof TypeMap

type Func = (...args:any) => any

type Methods<T> = {
  [K in keyof T as T[K] extends Func ? K : never]: T[K]
};
type Method<T, N extends keyof Methods<T>> = T[N]


declare type REMethodDefinition<
  T = unknown,
  M extends keyof Methods<T> = any,
  F extends Func = Method<T, M> extends Func ? Method<T, M> : any
> = {
  (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F>;
};

declare type RETypeDefinition<T = unknown> = {
    get_full_name(): string,
    get_name(): string,
    get_method<Name extends keyof Methods<T>>(name: Name): REMethodDefinition<T, Name>
}

declare type REManagedObject<T = unknown> = {
    add_ref: () => void
    release: () => void
    force_release: () => void
    get_type_definition: () => RETypeDefinition<T>
} & T


declare type Ptr<T = any> = {}

type PtrTuple<T extends [...any]> = {[K in keyof T]: Ptr<T[K]>}
type TupleIndex<T extends [...any]> = {[K in keyof T]: K}
type First2Elements<T> =
  T extends [infer E1] ? [E1] :
  T extends [infer E1, infer E2, ...any] ? [E1, E2] : 
  []

type HookFuncBefore<F extends Func> =
  /** @noSelf */
  (
    args: [
      Ptr<void>,
      Ptr<ThisParameterType<F>>,
      ...First2Elements<PtrTuple<Parameters<F>>>
    ]
  ) => sdk.PreHookresult | void;

type HookFuncAfter<F extends Func> =
  /** @noSelf */
  (retval: Ptr<ReturnType<F>>) => Ptr<ReturnType<F>>;


/** @noSelf */
declare namespace sdk {
  function get_tdb_version(): number;
  function get_managed_singleton<T extends keyof TypeMap>(
    name: T
  ): REManagedObject<TypeMap[T]>

  function create_instance<T extends keyof TypeMap>(
    name: T
  ): REManagedObject<TypeMap[T]>

  function find_type_definition<T extends keyof TypeMap>(name: T): RETypeDefinition<TypeMap[T]>
  function find_type_definition(name: string): RETypeDefinition

  function to_managed_object<T extends System.Object.T>(ptr: Ptr<T>): REManagedObject<T>
  function to_managed_object<T>(obj: T): T
  
  function to_ptr<T>(obj: T): Ptr<T>

  function to_float(ptr: Ptr): number
  function to_int64(ptr: Ptr): number
  function to_double(ptr: Ptr): number

  function float_to_ptr(number: number): Ptr<number>

  function hook<
    T,
    M extends keyof Methods<T>,
    F extends Func = Method<T, M> extends Func ? Method<T, M> : never
  >(
    func: REMethodDefinition<T, M>,
    before: HookFuncBefore<F>,
    after?: HookFuncAfter<F>
  );

  enum PreHookresult {
    CALL_ORIGINAL,
    SKIP_ORIGINAL
  }
}

/** @noSelf */
declare namespace json {
  function load_file(filepath: string): any
  function dump_file(filepath: string, value: any, indent?: number): boolean

  function load_string(json_str: string): any
  function dump_string(value: any, indent?: number): string
}

/** @noSelf */
declare namespace log {
  function debug(text: string)
  function info(text: string)
  function warn(text: string)
  function error(text: string)
}