import { describe, it, expect } from 'vitest'
import { dualChartTypePrimary, dualChartTypeSecondary } from 'src/pipeline/spec/chart/pipes/dual/dualChartType'
import type { SpecPipelineContext } from 'src/types'
import type { ISpec } from '@visactor/vchart'
import { DUAL_AXIS_CHART_COLUMN_Z_INDEX, DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX } from 'src/pipeline/utils/constant'

const createContext = (dualChartType?: any, index = 0): SpecPipelineContext => {
  return {
    vseed: {
      chartType: 'dualAxis',
    } as any,
    advancedVSeed: {
      chartType: 'dualAxis',
      config: {
        dualAxis: {
          dualChartType,
        },
      } as any,
      datasetReshapeInfo: [
        {
          index,
          unfoldInfo: {
            encodingDetail: 'detail_field',
          },
        },
      ] as any,
    } as any,
  }
}

const createSpec = (overrides: Partial<ISpec> = {}): ISpec => ({
  type: 'common',
  ...overrides,
} as any)

describe('dualChartTypePrimary', () => {
  describe('default behavior', () => {
    it('should use default column type when no config', () => {
      const context = createContext()
      const spec = createSpec()
      const result = dualChartTypePrimary(spec, context)

      expect(result.type).toBe('bar')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
    })
  })

  describe('primary chart types', () => {
    it('should handle line primary', () => {
      const context = createContext({ primary: 'line', secondary: 'column' })
      const spec = createSpec()
      const result = dualChartTypePrimary(spec, context)

      expect(result.type).toBe('line')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })

    it('should handle column primary with column z-index', () => {
      const context = createContext({ primary: 'column', secondary: 'line' })
      const spec = createSpec()
      const result = dualChartTypePrimary(spec, context)

      expect(result.type).toBe('bar')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
    })

    it('should handle area primary', () => {
      const context = createContext({ primary: 'area', secondary: 'line' })
      const spec = createSpec()
      const result = dualChartTypePrimary(spec, context)

      expect(result.type).toBe('area')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })

    it('should handle scatter primary', () => {
      const context = createContext({ primary: 'scatter', secondary: 'line' })
      const spec = createSpec()
      const result = dualChartTypePrimary(spec, context)

      expect(result.type).toBe('scatter')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })
  })

  describe('both column scenario (columnParallel)', () => {
    it('should handle both column as columnParallel', () => {
      const context = createContext({ primary: 'column', secondary: 'column' })
      const spec = createSpec({ xField: 'category' })
      const result = dualChartTypePrimary(spec, context)

      expect(result.type).toBe('bar')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
      expect(result.xField).toEqual(['category', 'detail_field'])
    })

    it('should handle array xField', () => {
      const context = createContext({ primary: 'column', secondary: 'column' })
      const spec = createSpec({ xField: ['cat1', 'cat2'] })
      const result = dualChartTypePrimary(spec, context)

      expect(result.xField).toEqual(['cat1', 'cat2', 'detail_field'])
    })
  })

  describe('percent types', () => {
    it('should handle columnPercent', () => {
      const context = createContext({ primary: 'columnPercent', secondary: 'line' })
      const spec = createSpec()
      const result = dualChartTypePrimary(spec, context)

      expect(result.type).toBe('bar')
      expect(result.percent).toBe(true)
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
    })

    it('should handle areaPercent', () => {
      const context = createContext({ primary: 'areaPercent', secondary: 'line' })
      const spec = createSpec()
      const result = dualChartTypePrimary(spec, context)

      expect(result.type).toBe('area')
      expect(result.percent).toBe(true)
    })
  })

  describe('array config', () => {
    it('should use config from specific index', () => {
      const context = createContext(
        [
          { primary: 'line', secondary: 'column' },
          { primary: 'area', secondary: 'line' },
        ],
        1
      )
      const spec = createSpec()
      const result = dualChartTypePrimary(spec, context)

      expect(result.type).toBe('area')
    })

    it('should fallback to first config when index out of range', () => {
      const context = createContext([{ primary: 'line', secondary: 'column' }], 5)
      const spec = createSpec()
      const result = dualChartTypePrimary(spec, context)

      expect(result.type).toBe('line')
    })
  })
})

describe('dualChartTypeSecondary', () => {
  describe('default behavior', () => {
    it('should use default line type when no config', () => {
      const context = createContext()
      const spec = createSpec()
      const result = dualChartTypeSecondary(spec, context)

      expect(result.type).toBe('line')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })
  })

  describe('secondary chart types', () => {
    it('should handle line secondary', () => {
      const context = createContext({ primary: 'column', secondary: 'line' })
      const spec = createSpec()
      const result = dualChartTypeSecondary(spec, context)

      expect(result.type).toBe('line')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })

    it('should handle column secondary', () => {
      const context = createContext({ primary: 'line', secondary: 'column' })
      const spec = createSpec()
      const result = dualChartTypeSecondary(spec, context)

      expect(result.type).toBe('bar')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
    })

    it('should handle area secondary', () => {
      const context = createContext({ primary: 'column', secondary: 'area' })
      const spec = createSpec()
      const result = dualChartTypeSecondary(spec, context)

      expect(result.type).toBe('area')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })

    it('should handle scatter secondary', () => {
      const context = createContext({ primary: 'column', secondary: 'scatter' })
      const spec = createSpec()
      const result = dualChartTypeSecondary(spec, context)

      expect(result.type).toBe('scatter')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })
  })

  describe('both column scenario', () => {
    it('should handle both column as columnParallel', () => {
      const context = createContext({ primary: 'column', secondary: 'column' })
      const spec = createSpec({ xField: 'category' })
      const result = dualChartTypeSecondary(spec, context)

      expect(result.type).toBe('bar')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
      expect(result.xField).toEqual(['category', 'detail_field'])
    })
  })

  describe('percent types', () => {
    it('should handle columnPercent', () => {
      const context = createContext({ primary: 'line', secondary: 'columnPercent' })
      const spec = createSpec()
      const result = dualChartTypeSecondary(spec, context)

      expect(result.type).toBe('bar')
      expect(result.percent).toBe(true)
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
    })

    it('should handle areaPercent', () => {
      const context = createContext({ primary: 'column', secondary: 'areaPercent' })
      const spec = createSpec()
      const result = dualChartTypeSecondary(spec, context)

      expect(result.type).toBe('area')
      expect(result.percent).toBe(true)
    })
  })

  describe('array config', () => {
    it('should use config from specific index', () => {
      const context = createContext(
        [
          { primary: 'column', secondary: 'line' },
          { primary: 'line', secondary: 'area' },
        ],
        1
      )
      const spec = createSpec()
      const result = dualChartTypeSecondary(spec, context)

      expect(result.type).toBe('area')
    })

    it('shoule not throw error when empty array config', () => {
      const context = createContext([], 0)
      const spec = createSpec()
      const result = dualChartTypeSecondary(spec, context)

      expect(result.type).toBe('line')
    })
  })

  describe('fallback behavior', () => {
    it('should use the type even if unknown (passes through)', () => {
      const context = createContext({ primary: 'column', secondary: 'unknown' as any })
      const spec = createSpec()
      const result = dualChartTypeSecondary(spec, context)

      // The default case in switch passes through the type
      expect(result.type).toBe('unknown')
    })
  })
})
