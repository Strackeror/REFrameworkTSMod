// Generic types used to emulate inheritance

declare type StaticField<T, F> = REField<T, F>
declare type StaticFunc<T, F extends Func> = REMethodDefinition<T, F>

declare type Inherit<T extends [any, ...any]> = T extends [
  infer U,
  infer V,
  ...infer R
]
  ? U & Inherit<[V, ...R]>
  : T[0];

declare let Inherit: new<T extends [any, ...any]>() => Inherit<T>
