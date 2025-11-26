import { describe, it, expect } from 'vitest'
import { calcOrder } from 'src/pipeline/advanced/chart/pipes/analysis/common'
import type { Sort } from 'src/types'

// Datum shape kept minimal for tests
interface D { [key: string]: string | number }

describe('calcOrder', () => {
  it('returns customOrder when provided', () => {
    const sortConfig: Sort = { customOrder: ['b', 'a', 'c'] }
    const result = calcOrder(sortConfig, 'x', [])
    expect(result).toEqual(['b', 'a', 'c'])
  })

  it('sorts ascending by id when order omitted (default asc)', () => {
    const data: D[] = [{ x: 'b' }, { x: 'a' }, { x: 'c' }]
    const result = calcOrder({}, 'x', data)
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('sorts descending by id when order = desc', () => {
    const data: D[] = [{ x: 'b' }, { x: 'a' }, { x: 'c' }]
    const result = calcOrder({ order: 'desc' }, 'x', data)
    expect(result).toEqual(['c', 'b', 'a'])
  })

  it('sorts using orderBy field different from id, returns unique id order', () => {
    const data: D[] = [
      { x: 'A', v: 3 },
      { x: 'B', v: 1 },
      { x: 'C', v: 2 },
    ]
    const result = calcOrder({ order: 'asc', orderBy: 'v' }, 'x', data)
    expect(result).toEqual(['B', 'C', 'A'])
  })

  it('handles duplicates and keeps first occurrence order after sort', () => {
    const data: D[] = [
      { x: 'A', v: 2 },
      { x: 'A', v: 1 },
      { x: 'B', v: 3 },
      { x: 'B', v: 4 },
    ]
    // orderBy v asc => rows sorted by v: (A,v:1),(A,v:2),(B,v:3),(B,v:4) then unique on x => ['A','B']
    const result = calcOrder({ order: 'asc', orderBy: 'v' }, 'x', data)
    expect(result).toEqual(['A', 'B'])
  })

  it('sorts numeric ascending with mixed numeric values', () => {
    const data: D[] = [ { x: 'Y', val: 10 }, { x: 'X', val: 2 }, { x: 'Z', val: 5 } ]
    const result = calcOrder({ orderBy: 'val' }, 'x', data)
    expect(result).toEqual(['X', 'Z', 'Y'])
  })

  it('sorts numeric descending', () => {
    const data: D[] = [ { x: 'Y', val: 10 }, { x: 'X', val: 2 }, { x: 'Z', val: 5 } ]
    const result = calcOrder({ order: 'desc', orderBy: 'val' }, 'x', data)
    expect(result).toEqual(['Y', 'Z', 'X'])
  })

  it('sorts strings lexicographically', () => {
    const data: D[] = [ { x: 'beta' }, { x: 'alpha' }, { x: 'gamma' } ]
    const result = calcOrder({ order: 'asc' }, 'x', data)
    expect(result).toEqual(['alpha', 'beta', 'gamma'])
  })

  it('handles empty dataset gracefully', () => {
    const result = calcOrder({}, 'x', [])
    expect(result).toEqual([])
  })
})
