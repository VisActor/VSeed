import { describe, it, expect } from 'vitest'
import { buildMeasuresForScatter } from 'src/pipeline/advanced/chart/pipes/measures/buildMeasuresForScatter'
import type { AdvancedVSeed, VSeed } from 'src/types'

describe('buildMeasuresForScatter', () => {
  it('keeps measures unchanged when no transformation needed', () => {
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

  it('converts parentId measures into reshapeMeasures array', () => {
    const vseed: VSeed = {
      chartType: 'scatter',
      dataset: [{ m1: 0, m2: 0, m3: 0 }],
      measures: [
        { id: 'm1', encoding: 'xAxis', parentId: '1' },
        { id: 'm2', encoding: 'yAxis', parentId: '1' },
        { id: 'm3', encoding: 'color', parentId: '1' }
      ]
    }
    const advancedVSeed: Partial<AdvancedVSeed> = {
       measures: [...vseed.measures!]
    }

    const res = buildMeasuresForScatter(advancedVSeed, { vseed })
    
    // should produce reshapeMeasures as Measure[][]
    expect(Array.isArray(res.reshapeMeasures)).toBe(true)
    expect(res.reshapeMeasures?.length).toBe(1)
    
    // first group contains xAxis and yAxis measures
    const firstGroup = res.reshapeMeasures![0]
    expect(firstGroup.length).toBe(2)
    expect(firstGroup[0]).toMatchObject({ id: 'm1', encoding: 'xAxis', parentId: '1' })
    expect(firstGroup[1]).toMatchObject({ id: 'm2', encoding: 'yAxis', parentId: '1' })
  })

  it('converts simple measures into reshapeMeasures array', () => {
    const vseed: VSeed = {
      chartType: 'scatter',
      dataset: [{ m1: 0, m2: 0, m3: 0 }],
      measures: [
        { id: 'm1', encoding: 'xAxis' },
        { id: 'm2', encoding: 'yAxis' },
        { id: 'm3', encoding: 'color' }
      ]
    }
    const advancedVSeed: Partial<AdvancedVSeed> = {
       measures: [...vseed.measures!]
    }

    const res = buildMeasuresForScatter(advancedVSeed, { vseed })
    
    // should produce reshapeMeasures as Measure[][]
    expect(Array.isArray(res.reshapeMeasures)).toBe(true)
    expect(res.reshapeMeasures?.length).toBe(1)
    
    // first group contains xAxis and yAxis measures
    const firstGroup = res.reshapeMeasures![0]
    expect(firstGroup.length).toBe(2)
    expect(firstGroup[0]).toMatchObject({ id: 'm1', encoding: 'xAxis' })
    expect(firstGroup[1]).toMatchObject({ id: 'm2', encoding: 'yAxis' })
  })
})
