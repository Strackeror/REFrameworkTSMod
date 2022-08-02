// Generic types used to emulate inheritance

declare type Static<T, FN extends keyof T> = T[FN] extends Func ? REMethodDefinition<T, FN> : REField<T, FN>
