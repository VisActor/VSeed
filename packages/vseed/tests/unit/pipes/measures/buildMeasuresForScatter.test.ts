import { describe, it, expect } from 'vitest'
import { buildMeasuresForScatter } from 'src/pipeline/advanced/chart/pipes/measures/buildMeasuresForScatter'
import type { AdvancedVSeed, MeasureGroup, VSeed } from 'src/types'

describe('buildMeasuresForScatter', () => {
  it('returns early when measures already have children', () => {
    const vseed: VSeed = {
      chartType: 'scatter',
      dataset: [],
    }
    const advancedVSeed: Partial<AdvancedVSeed> = {
      measures: vseed.measures
    }
    const res = buildMeasuresForScatter(advancedVSeed, { vseed })
    expect(res.measures).toEqual(advancedVSeed.measures)
  })

  it('converts parentId measures into grouped measure tree', () => {
    const vseed: VSeed = {
      chartType: 'scatter',
      dataset: [{ m1: 0, m2: 0, m3: 0 }],
      measures: [
        { id: 'm1', encoding: 'xAxis', parentId: '1' },
        { id: 'm2', encoding: 'yAxis', parentId: '1' },
        {
          id: 'm3', encoding: 'color', parentId: '1'
        }
      ]
    }
    const advancedVSeed: Partial<AdvancedVSeed> = {
       measures: [...vseed.measures!]
    }

    const res = buildMeasuresForScatter(advancedVSeed, { vseed })
    // should produce groups / children containing m1 and m2
    expect(Array.isArray(res.measures)).toBe(true)
    expect(res.measures?.length).toBe(3)

    expect(res.measures![0]).toEqual({ id: '0-x', alias: 'm1', children: [
      vseed.measures![0]
    ]})
    expect(res.measures![1]).toEqual({ id: '0-y', alias: 'm2', children: [
      vseed.measures![1]
    ]})
    expect(res.measures![2]).toMatchObject(vseed.measures![2])
  })

    it('converts simple measures into grouped measure tree', () => {
    const vseed: VSeed = {
      chartType: 'scatter',
      dataset: [{ m1: 0, m2: 0, m3: 0 }],
      measures: [
        { id: 'm1', encoding: 'xAxis' },
        { id: 'm2', encoding: 'yAxis' },
        {
          id: 'm3', encoding: 'color'
        }
      ]
    }
    const advancedVSeed: Partial<AdvancedVSeed> = {
       measures: [...vseed.measures!]
    }

    const res = buildMeasuresForScatter(advancedVSeed, { vseed })
    // should produce groups / children containing m1 and m2
    expect(Array.isArray(res.measures)).toBe(true)
    expect(res.measures?.length).toBe(3)

    expect(res.measures![0]).toEqual({ id: '0-x', alias: 'm1', children: [
      vseed.measures![0]
    ]})
    expect(res.measures![1]).toEqual({ id: '0-y', alias: 'm2', children: [
      vseed.measures![1]
    ]})
    expect(res.measures![2]).toMatchObject(vseed.measures![2])
  })

  it('uses vseed.scatterMeasures when provided', () => {
     const advancedVSeed: Partial<AdvancedVSeed> = {}
    const context = {
      vseed: {
        chartType: 'scatter',
        dataset: [],
        scatterMeasures: [{ id: 's1', xMeasures: [{ id: 'xm' }], yMeasures: [{ id: 'ym' }] }]
      } as VSeed
    }

    const res = buildMeasuresForScatter(advancedVSeed, context)
    // for single scatterMeasures, buildMeasuresForScatter returns the children (two groups)
    expect(Array.isArray(res.measures)).toBe(true)
    expect(res.measures!.length).toBe(2)
    expect(res.measures![0].id).toBe('0-x')
    expect(res.measures![1].id).toBe('0-y')
    expect((res.measures![0] as MeasureGroup).children![0].id).toBe('xm')
    expect((res.measures![1] as MeasureGroup).children![0].id).toBe('ym')
  })
})
