// Generic types used to emulate inheritance

declare type StaticField<T, F> = REField<T, F>
declare type StaticFunc<T, F extends Func> = REMethodDefinition<T, F>
