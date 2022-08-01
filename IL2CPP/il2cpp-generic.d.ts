// Generic types used to emulate inheritance

declare type Members<M, T extends M> = {
  [K in keyof M]: M[K] extends Func ? REMethodDefinition<T, K> : REField<T, K>;
};

declare interface TypeId<
  T = any,
  TypeList extends number[] = any[],
  Generics extends any[] = any[]
> {
  "~~TypeList": [
    [
      // Type id number list
      ...TypeList,
      ...number[]
    ],
    [
      // Generic list
      ...Generics,
      ...any[]
    ]
  ];
}

declare type Inherit<T, Parent> = T & Omit<Parent, keyof T>

declare type Indexed<Input, Output> = {
  [K in Input as K extends string | number | symbol ? K : never]: Output;
};
