// Generic types used to emulate inheritance

// Tag type for static functions
declare interface Static {
  __Static: Static;
}

type StaticThis<This, T> = This extends Static ? Static : T;

declare type Members<T> = {
  [K in keyof T]: T[K] extends (
    this: infer This,
    ...args: infer Params
  ) => infer ReturnType
    ? (this: StaticThis<This, T>, ...args: Params) => ReturnType
    : T[K] extends (this: infer This) => infer ReturnType
    ? (this: StaticThis<This, T>) => ReturnType
    : T[K];
};

declare type Inherit<T, Parent> = T & Omit<Parent, keyof T>;
declare type Indexed<Input, Output> = {
  [K in Input as K extends string | number | symbol ? K : never]: Output;
};
