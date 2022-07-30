// Generic types used to emulate inheritance

declare type Members<T> = {
  [K in keyof T]: T[K] extends (
    this: any,
    ...args: infer Params
  ) => infer ReturnType
    ? (this: T, ...args: Params) => ReturnType
    : T[K] extends (this: any) => infer ReturnType
    ? (this: T) => ReturnType
    : T[K];
};

declare type Inherit<T, Parent> = T & Omit<Parent, keyof T>;
declare type Indexed<Input, Output> = {
  [K in Input as K extends string | number | symbol ? K : never]: Output;
};

// Tag type for static functions
declare interface Static {
  __Static: Static;
}
