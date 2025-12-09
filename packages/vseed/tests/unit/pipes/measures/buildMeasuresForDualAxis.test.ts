import { describe, it, expect } from 'vitest'
import { buildMeasuresForDualAxis } from 'src/pipeline/advanced/chart/pipes/measures/buildMeasuresForDualAxis'
import type { AdvancedVSeed, MeasureGroup, VSeed } from 'src/types'

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

  it('converts parentId measures into grouped dual-axis measure tree', () => {
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
    // should produce groups / children containing m1 and m2
    expect(Array.isArray(res.measures)).toBe(true)
    expect(res.measures?.some((g: any) => Array.isArray((g as MeasureGroup).children) && (g as MeasureGroup).children!.some((c) => c.id === 'm1'))).toBe(true)
    expect(res.measures?.some((g: any) => Array.isArray((g as MeasureGroup).children) && (g as MeasureGroup).children!.some((c) => c.id === 'm2'))).toBe(true)
  })

  it('uses vseed.dualMeasures when provided', () => {
     const advancedVSeed: Partial<AdvancedVSeed> = {}
    const context = {
      vseed: {
        chartType: 'dualAxis',
        dataset: [],
        dualMeasures: [{ id: 'd1', primaryMeasures: [{ id: 'p' }], secondaryMeasures: [{ id: 's' }] }]
      } as VSeed
    }

    const res = buildMeasuresForDualAxis(advancedVSeed, context)
    // for single dualMeasures, buildMeasuresForDualAxis returns the children (two groups)
    expect(Array.isArray(res.measures)).toBe(true)
    expect(res.measures!.length).toBe(2)
    expect(res.measures![0].id).toBe('0-primary')
    expect(res.measures![1].id).toBe('0-secondary')
    expect((res.measures![0] as MeasureGroup).children![0].id).toBe('p')
    expect((res.measures![1] as MeasureGroup).children![0].id).toBe('s')
  })

  it('converts flat basic measures into dual groups when no vseed.dualMeasures', () => {
    const vseed: VSeed = {
      chartType: 'dualAxis',
      dataset: [{ m1: 0, m2: 0 }],
      measures: [ { id: 'm1' }, { id: 'm2' } ]
    }
    const advancedVSeed: Partial<AdvancedVSeed> = {
      measures: [...vseed.measures!]
    }

    const res = buildMeasuresForDualAxis(advancedVSeed, { vseed })
    expect(Array.isArray(res.measures)).toBe(true)
    // should produce two groups for primary and secondary
    expect(res.measures?.length).toBe(2)
    expect((res.measures![0] as MeasureGroup).children![0].id).toBe('m1')
    expect((res.measures![1] as MeasureGroup).children![0].id).toBe('m2')
  })

  it('handles parentId with same encoding across different parents and encoded color', () => {
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
    // m1 and m2 should be present in nested child groups (parent -> primary/secondary -> leaf), and m3 appended
    const hasM1 = res.measures?.some((g: any) =>
      Array.isArray((g as MeasureGroup).children) && (g as MeasureGroup).children!.some((gc: any) => Array.isArray(gc.children) && (gc as MeasureGroup).children!.some((c: any) => c.id === 'm1'))
    )
    const hasM2 = res.measures?.some((g: any) =>
      Array.isArray((g as MeasureGroup).children) && (g as MeasureGroup).children!.some((gc: any) => Array.isArray(gc.children) && (gc as MeasureGroup).children!.some((c: any) => c.id === 'm2'))
    )
    expect(hasM1).toBe(true)
    expect(hasM2).toBe(true)
    expect(res.measures?.some(m => (m as any).id === 'm3')).toBe(true)
  })

  it('handles mixed primary/secondary with parentIds and encoded color', () => {
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
    const hasM1Mixed = res.measures?.some((g: any) =>
      Array.isArray((g as MeasureGroup).children) && (g as MeasureGroup).children!.some((gc: any) => Array.isArray(gc.children) && (gc as MeasureGroup).children!.some((c: any) => c.id === 'm1'))
    )
    const hasM2Mixed = res.measures?.some((g: any) =>
      Array.isArray((g as MeasureGroup).children) && (g as MeasureGroup).children!.some((gc: any) => Array.isArray(gc.children) && (gc as MeasureGroup).children!.some((c: any) => c.id === 'm2'))
    )
    expect(hasM1Mixed).toBe(true)
    expect(hasM2Mixed).toBe(true)
    expect(res.measures?.some(m => (m as any).id === 'm3')).toBe(true)
  })

  it('handles single dualMeasures (no parentId) with primary/secondary and encoded color', () => {
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

    // For single dualMeasures, function returns children (primary & secondary) and then appends encoded measures
    expect(Array.isArray(res.measures)).toBe(true)
    expect((res.measures![0] as MeasureGroup).children![0].id).toBe('m1')
    expect((res.measures![1] as MeasureGroup).children![0].id).toBe('m2')
    expect(res.measures?.some(m => (m as any).id === 'm3')).toBe(true)
  })

  it('handles single dualMeasures with an extra unencoded measure appended to secondary', () => {
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

    expect(Array.isArray(res.measures)).toBe(true)
    // primary should contain m1
    expect((res.measures![0] as MeasureGroup).children![0].id).toBe('m1')
    // secondary should contain m2 and m4
    expect((res.measures![1] as MeasureGroup).children!.some(c => c.id === 'm2')).toBe(true)
    expect((res.measures![1] as MeasureGroup).children!.some(c => c.id === 'm4')).toBe(true)
    // encoded m3 should be appended
    expect(res.measures?.some(m => (m as any).id === 'm3')).toBe(true)
  })
})
