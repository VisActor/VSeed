import { describe, it, expect } from 'vitest'
import { buildMeasuresForDualAxis } from 'src/pipeline/advanced/chart/pipes/measures/buildMeasuresForDualAxis'
import type { AdvancedVSeed, VSeed } from 'src/types'

describe('buildMeasuresForDualAxis', () => {
  it('returns early when measures already have children', () => {
    const vseed: VSeed = {
      chartType: 'dualAxis',
      dataset: [],
    }
    const advancedVSeed: Partial<AdvancedVSeed> = {
      measures: vseed.measures
    }
    const res = buildMeasuresForDualAxis(advancedVSeed, { vseed })
    expect(res.measures).toEqual(advancedVSeed.measures)
  })

  it('converts parentId measures into reshapeMeasures array', () => {
    const vseed: VSeed = {
      chartType: 'dualAxis',
      dataset: [{ m1: 0, m2: 0 }],
      measures: [
        { id: 'm1', parentId: '1' },
        { id: 'm2', parentId: '1' }
      ]
    }
    const advancedVSeed: Partial<AdvancedVSeed> = {
      measures: [...vseed.measures!]
    }

    const res = buildMeasuresForDualAxis(advancedVSeed, { vseed })
    
    // should produce reshapeMeasures as Measure[][]
    expect(Array.isArray(res.reshapeMeasures)).toBe(true)
    expect(res.reshapeMeasures?.length).toBe(1)
    
    // first group should contain both measures
    const firstGroup = res.reshapeMeasures![0]
    expect(firstGroup.length).toBe(2)
    expect(firstGroup.some(m => m.id === 'm1')).toBe(true)
    expect(firstGroup.some(m => m.id === 'm2')).toBe(true)
  })

  it('converts flat basic measures into reshapeMeasures when no parentIds', () => {
    const vseed: VSeed = {
      chartType: 'dualAxis',
      dataset: [{ m1: 0, m2: 0 }],
      measures: [ { id: 'm1' }, { id: 'm2' } ]
    }
    const advancedVSeed: Partial<AdvancedVSeed> = {
      measures: [...vseed.measures!]
    }

    const res = buildMeasuresForDualAxis(advancedVSeed, { vseed })
    
    expect(Array.isArray(res.reshapeMeasures)).toBe(true)
    expect(res.reshapeMeasures?.length).toBe(1)
    
    // should produce one group with both measures (auto-assigned primaryYAxis and secondaryYAxis)
    const firstGroup = res.reshapeMeasures![0]
    expect(firstGroup.length).toBe(2)
    expect(firstGroup[0].id).toBe('m1')
    expect(firstGroup[0].encoding).toBe('primaryYAxis')
    expect(firstGroup[1].id).toBe('m2')
    expect(firstGroup[1].encoding).toBe('secondaryYAxis')
  })

  it('handles parentId with same encoding across different parents', () => {
    const vseed: VSeed = {
      chartType: 'dualAxis',
      dataset: [{ m1: 0, m2: 0, m3: 0 }],
      measures: [
        { id: 'm1', encoding: 'primaryYAxis', parentId: '1' },
        { id: 'm2', encoding: 'primaryYAxis', parentId: '2' },
        { id: 'm3', encoding: 'color' }
      ]
    }

    const advancedVSeed: Partial<AdvancedVSeed> = { measures: [...vseed.measures!] }
    const res = buildMeasuresForDualAxis(advancedVSeed, { vseed })
    
    // should produce reshapeMeasures with 2 groups (one per parentId)
    expect(Array.isArray(res.reshapeMeasures)).toBe(true)
    expect(res.reshapeMeasures?.length).toBe(2)
    
    // m3 with color encoding should not be in reshapeMeasures (it's a common encoding)
    const allMeasures = res.reshapeMeasures!.flat()
    expect(allMeasures.some(m => m.id === 'm1')).toBe(true)
    expect(allMeasures.some(m => m.id === 'm2')).toBe(true)
    expect(allMeasures.some(m => m.id === 'm3')).toBe(false)
  })

  it('handles mixed primary/secondary with parentIds', () => {
    const vseed: VSeed = {
      chartType: 'dualAxis',
      dataset: [{ m1: 0, m2: 0, m3: 0 }],
      measures: [
        { id: 'm1', encoding: 'primaryYAxis', parentId: '1' },
        { id: 'm2', encoding: 'secondaryYAxis', parentId: '2' },
        { id: 'm3', encoding: 'color' }
      ]
    }

    const advancedVSeed: Partial<AdvancedVSeed> = { measures: [...vseed.measures!] }
    const res = buildMeasuresForDualAxis(advancedVSeed, { vseed })
    
    expect(Array.isArray(res.reshapeMeasures)).toBe(true)
    expect(res.reshapeMeasures?.length).toBe(2)
    
    const allMeasures = res.reshapeMeasures!.flat()
    expect(allMeasures.some(m => m.id === 'm1')).toBe(true)
    expect(allMeasures.some(m => m.id === 'm2')).toBe(true)
    expect(allMeasures.some(m => m.id === 'm3')).toBe(false)
  })

  it('handles single group with primary/secondary encoding', () => {
    const vseed: VSeed = {
      chartType: 'dualAxis',
      dataset: [{ m1: 0, m2: 0, m3: 0 }],
      measures: [
        { id: 'm1', encoding: 'primaryYAxis' },
        { id: 'm2', encoding: 'secondaryYAxis' },
        { id: 'm3', encoding: 'color' }
      ]
    }

    const advancedVSeed: Partial<AdvancedVSeed> = { measures: [...vseed.measures!] }
    const res = buildMeasuresForDualAxis(advancedVSeed, { vseed })

    expect(Array.isArray(res.reshapeMeasures)).toBe(true)
    expect(res.reshapeMeasures?.length).toBe(1)
    
    const firstGroup = res.reshapeMeasures![0]
    expect(firstGroup.some(m => m.id === 'm1' && m.encoding === 'primaryYAxis')).toBe(true)
    expect(firstGroup.some(m => m.id === 'm2' && m.encoding === 'secondaryYAxis')).toBe(true)
    expect(firstGroup.some(m => m.id === 'm3')).toBe(false) // color is common encoding, excluded
  })

  it('handles single group with auto-assigned secondary axis for extra unencoded measure', () => {
    const vseed: VSeed = {
      chartType: 'dualAxis',
      dataset: [{ m1: 0, m2: 0, m3: 0, m4: 0 }],
      measures: [
        { id: 'm1', encoding: 'primaryYAxis' },
        { id: 'm2', encoding: 'secondaryYAxis' },
        { id: 'm3', encoding: 'color' },
        { id: 'm4' }
      ]
    }

    const advancedVSeed: Partial<AdvancedVSeed> = { measures: [...vseed.measures!] }
    const res = buildMeasuresForDualAxis(advancedVSeed, { vseed })

    expect(Array.isArray(res.reshapeMeasures)).toBe(true)
    expect(res.reshapeMeasures?.length).toBe(1)
    
    const firstGroup = res.reshapeMeasures![0]
    expect(firstGroup.some(m => m.id === 'm1' && m.encoding === 'primaryYAxis')).toBe(true)
    expect(firstGroup.some(m => m.id === 'm2' && m.encoding === 'secondaryYAxis')).toBe(true)
    expect(firstGroup.some(m => m.id === 'm4' && m.encoding === 'secondaryYAxis')).toBe(true) // auto-assigned
    expect(firstGroup.some(m => m.id === 'm3')).toBe(false) // color is common encoding, excluded
  })
})
