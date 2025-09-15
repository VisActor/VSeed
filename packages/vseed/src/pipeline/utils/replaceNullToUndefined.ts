import { isPlainObject, mapValues, pipe } from 'remeda'

// 递归类型，将所有 null 替换为 undefined
type NullToUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
    ? NullToUndefined<U>[]
    : T extends object
      ? { [K in keyof T]: NullToUndefined<T[K]> }
      : T

export const replaceNullToUndefined = <T>(obj: T): NullToUndefined<T> => {
  if (obj === null) {
    return undefined as NullToUndefined<T>
  }
  if (Array.isArray(obj)) {
    // 递归处理数组元素
    return obj.map(replaceNullToUndefined) as NullToUndefined<T>
  }
  if (isPlainObject(obj)) {
    // 使用 remeda 的 mapValues 递归处理对象属性
    return pipe(
      obj as object,
      mapValues((value) => replaceNullToUndefined(value)),
    ) as NullToUndefined<T>
  }
  return obj as NullToUndefined<T>
}
