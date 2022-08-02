// Generic types used to emulate inheritance

declare type StaticField<T, F> = REField<T, F>
declare type StaticFunc<T, F extends Func> = REMethodDefinition<T, F>

declare type Inherit<T, U> = T & U
declare let Inherit: new<T, U>() => Inherit<T, U>
