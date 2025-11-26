import { describe, it, expect } from 'vitest'
import { findMeasureById, findFirstMeasure, findAllMeasures } from 'src/pipeline/utils/measures/find'
import type { MeasureTree } from 'src/types'

describe('find.ts measure find helpers', () => {
  it('findMeasureById returns measure nested multiple levels', () => {
    const measures: MeasureTree = [
      { id: 'groupA', children: [ { id: 'groupB', children: [ { id: 'm1' }, { id: 'm2' } ] } ] },
      { id: 'm3' }
    ]
    expect(findMeasureById(measures, 'm2')?.id).toBe('m2')
    expect(findMeasureById(measures, 'mX')).toBeUndefined()
  })

  it('findFirstMeasure when first root node is a group returns first leaf in that group', () => {
    const measures: MeasureTree = [
      { id: 'group', children: [ { id: 'm1' }, { id: 'm2' } ] },
      { id: 'm3' }
    ]
    expect(findFirstMeasure(measures)?.id).toBe('m1')
  })

  it('findAllMeasures returns leaves in pre-order sequence', () => {
    const measures: MeasureTree = [
      { id: 'groupA', children: [ { id: 'm1' }, { id: 'groupB', children: [ { id: 'm2' }, { id: 'm4' } ] } ] },
      { id: 'm3' }
    ]
    const ids = findAllMeasures(measures).map(m => m.id)
    expect(ids).toEqual(['m1', 'm2', 'm4', 'm3'])
  })

  it('handles empty and undefined inputs gracefully', () => {
    expect(findMeasureById([], 'x')).toBeUndefined()
    expect(findFirstMeasure([])).toBeUndefined()
    expect(findAllMeasures([])).toEqual([])
    // explicit undefined passed should still default to []
    expect(findMeasureById(undefined as unknown as MeasureTree, 'x')).toBeUndefined()
    expect(findFirstMeasure(undefined as unknown as MeasureTree)).toBeUndefined()
    expect(findAllMeasures(undefined as unknown as MeasureTree)).toEqual([])
  })

  it('does not mutate original measure tree', () => {
    const measures: MeasureTree = [ { id: 'm1' }, { id: 'group', children: [ { id: 'm2' } ] } ]
    const snapshot = JSON.stringify(measures)
    findMeasureById(measures, 'm2')
    findFirstMeasure(measures)
    findAllMeasures(measures)
    expect(JSON.stringify(measures)).toBe(snapshot)
  })
})
