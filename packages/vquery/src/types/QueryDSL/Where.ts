export type Where<T> = WhereGroup<T>

export type WhereGroup<T> = {
  op: 'and' | 'or'
  conditions: Array<WhereClause<T>>
}

export type WhereClause<T> = WhereLeaf<T> | WhereGroup<T>

export type WhereLeaf<T> = {
  [K in keyof T]: {
    // 遍历表 T 的所有字段名
    [O in Operator]: {
      // 遍历所有操作符
      field: K // 字段名是具体的 K，而不是宽泛的 string
      op: O // 操作符是具体的 O，这是可辨识属性
    } & (O extends 'is null' | 'is not null' // 根据 O 和 T[K] 的类型，精确地定义 value
      ? { value?: never }
      : O extends 'in' | 'not in'
        ? { value: T[K][] }
        : O extends 'between' | 'not between'
          ? { value: [T[K], T[K]] }
          : { value: T[K] })
  }[Operator] // 获取所有操作符类型组成的联合类型
}[keyof T] // 获取所有字段类型组成的联合类型

type Operator =
  // 适用于大多数类型的操作符
  | '='
  | '!='
  | '>'
  | '>='
  | '<'
  | '<='
  // 大小写敏感
  | 'like'
  | 'not like'
  // 大小写不敏感
  | 'ilike'
  | 'not ilike'
  // 适用于数组的操作符
  | 'in'
  | 'not in'
  // 适用于范围查询的操作符
  | 'between'
  | 'not between'
  // 检查存在性的操作符
  | 'is null'
  | 'is not null'
