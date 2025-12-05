import { describe, test, expect, beforeAll } from 'vitest'
import type { VSeed } from '@visactor/vseed'
import { Builder, registerAll } from '@visactor/vseed'

beforeAll(() => {
  registerAll()
})

describe('Builder - Empty Cases', () => {
  test('should throw error for empty VSeed configuration', () => {
    const vseed: VSeed = {}
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('chartType is nil in buildAdvanced')
  })

  test('should throw error for empty dataset', () => {
    const vseed: VSeed = {
      dataset: []
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('chartType is nil in buildAdvanced')
  })

  test('should throw error for dual axis chart without dataset', () => {
    const vseed: VSeed = {
      chartType: 'dualAxis'
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('dataset is required, and must be an array')
  })

  test('should throw error for pivot table without dataset', () => {
    const vseed: VSeed = {
      chartType: 'pivotTable'
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('dataset is required, and must be an array')
  })

  test('should throw error for scatter chart without dataset', () => {
    const vseed: VSeed = {
      chartType: 'scatter'
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('dataset is required, and must be an array')
  })

  test('should throw error for table without dataset', () => {
    const vseed: VSeed = {
      chartType: 'table'
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('dataset is required, and must be an array')
  })
})

describe('Builder - Error Cases', () => {
  test('should throw error for invalid chart type', () => {
    const vseed: VSeed = {
      chartType: 'test_chart_type' as any
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('no advanced pipeline for chartType test_chart_type')
  })

  test('should throw error for invalid dataset type', () => {
    const vseed: VSeed = {
      dataset: 'invalid' as any
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('chartType is nil in buildAdvanced')
  })

  test('should throw error for invalid dimensions type', () => {
    const vseed: VSeed = {
      dimensions: 'invalid' as any
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('chartType is nil in buildAdvanced')
  })

  test('should throw error for invalid measures type', () => {
    const vseed: VSeed = {
      measures: 'invalid' as any
    }
    const builder = Builder.from(vseed)

    expect(() => builder.buildAdvanced()).toThrow('chartType is nil in buildAdvanced')
  })
})

describe('Builder - Core Methods', () => {
  test('should return valid color id map', () => {
    const vseed: VSeed = { chartType: 'bar' }
    const builder = Builder.from(vseed)

    const colorIdMap = builder.getColorIdMap()
    expect(colorIdMap).toBeDefined()
  })

  test('should return valid color items', () => {
    const vseed: VSeed = { chartType: 'bar' }
    const builder = Builder.from(vseed)

    const colorItems = builder.getColorItems()
    expect(colorItems).toBeDefined()
  })

  test('should get advanced pipeline for chart type', () => {
    const pipeline = Builder.getAdvancedPipeline('bar')
    expect(pipeline).toBeDefined()
  })

  test('should get spec pipeline for chart type', () => {
    const pipeline = Builder.getSpecPipeline('bar')
    expect(pipeline).toBeDefined()
  })

  test('should get theme', () => {
    const theme = Builder.getTheme('light')
    expect(theme).toBeDefined()
  })

  test('should get theme map', () => {
    const themeMap = Builder.getThemeMap()
    expect(themeMap).toBeDefined()
  })
})
