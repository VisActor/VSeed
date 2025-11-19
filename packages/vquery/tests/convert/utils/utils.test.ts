import { isSelectItem, isWhereLeaf, isWhereGroup, isStringOrNumber, escapeLiteral } from 'src/dataset/convert/utils'
import { Where } from 'src/types/QueryDSL/Where'

describe('utils', () => {
  it('isSelectItem', () => {
    type T = { a: number; b: string }
    expect(isSelectItem<T>('a')).toBe(false)
    expect(isSelectItem<T>({ field: 'a' })).toBe(true)
  })

  it('isWhere guards', () => {
    type T = { a: number; b: string }
    const leaf: Where<T> = {
      op: 'and',
      conditions: [{ field: 'a', op: '>=', value: 1 }],
    }
    expect(isWhereGroup<T>(leaf)).toBe(true)
    const inner = leaf.conditions[0]
    expect(isWhereLeaf<T>(inner)).toBe(true)
    const group: Where<T> = { op: 'or', conditions: [leaf] }
    expect(isWhereGroup<T>(group)).toBe(true)
  })

  it('isStringOrNumber', () => {
    expect(isStringOrNumber(1)).toBe(true)
    expect(isStringOrNumber('x')).toBe(true)
    expect(isStringOrNumber({})).toBe(false)
  })

  it('escapeLiteral', () => {
    expect(escapeLiteral<{ a: string }>("O'Reilly")).toBe("'O''Reilly'")
  })
})
