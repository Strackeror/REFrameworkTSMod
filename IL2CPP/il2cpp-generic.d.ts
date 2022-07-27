// Generic types used to emulate inheritance

declare type Members<T> = 
{
  Instance?: T,
} & { 
    [K in keyof T]:
      T[K] extends (this: any, ...args: infer Params) => infer ReturnType ?
        (this: T, ...args: Params) => ReturnType :
      T[K] extends (this: any) => infer ReturnType ? 
        (this:T) => ReturnType :
      T[K]
}

declare type Inherit<T, Parent> = T & Omit<Parent, keyof (T)>




