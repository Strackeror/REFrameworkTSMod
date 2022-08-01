// Generic types used to emulate inheritance

declare type Members<M, T extends M> = {
  [K in keyof M]: M[K] extends Func ? REMethodDefinition<T, K> : REField<T, K>;
};

declare interface TypeId<T = any, TypeList extends number[] = []> { "~~TypeList":[...TypeList, ...number[]]}
declare type Inherit<T, Parent> = T & Omit<Parent, keyof T>;
declare type Indexed<Input, Output> = {
  [K in Input as K extends string | number | symbol ? K : never]: Output;
};

