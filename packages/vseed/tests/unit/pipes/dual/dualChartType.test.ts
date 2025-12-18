import { describe, it, expect } from 'vitest'
import { dualChartType } from 'src/pipeline/spec/chart/pipes/dual/dualChartType'
import type { SpecPipelineContext, ChartType } from 'src/types'
import type { ISpec, ISeriesSpec, IBarSeriesSpec } from '@visactor/vchart'
import type { DualAxisOptions } from 'src/types/properties'
import { DUAL_AXIS_CHART_COLUMN_Z_INDEX, DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX } from 'src/pipeline/utils/constant'

const createContext = (chartType: ChartType, reshapeMeasures?: any[], index = 0): SpecPipelineContext => {
  return {
    vseed: {
      chartType: 'dualAxis',
    } as any,
    advancedVSeed: {
      chartType: 'dualAxis',
      datasetReshapeInfo: [
        {
          index,
          unfoldInfo: {
            encodingDetail: 'detail_field',
          },
        },
      ] as any,
      reshapeMeasures: reshapeMeasures || [
        [
          {
            id: 'measure1',
            chartType,
            encoding: 'primaryYAxis',
          },
        ],
      ],
    } as any,
  }
}

const createSpec = (overrides: Partial<ISpec> = {}): ISpec => ({
  type: 'common',
  ...overrides,
} as any)

const createOptions = (chartType: ChartType, axisType: 'primary' | 'secondary' = 'primary'): DualAxisOptions => ({
  axisType,
  chartType,
  foldInfo: {} as any,
})

describe('dualChartType', () => {
  describe('default behavior', () => {
    it('should use default column type for primary axis', () => {
      const context = createContext('column')
      const spec = createSpec()
      const pipe = dualChartType(createOptions('column', 'primary'))
      const result = pipe(spec, context) as ISeriesSpec

      expect(result.type).toBe('bar')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
    })

    it('should use default line type for secondary axis', () => {
      const context = createContext('line')
      const spec = createSpec()
      const pipe = dualChartType(createOptions('line', 'secondary'))
      const result = pipe(spec, context) as ISeriesSpec

      expect(result.type).toBe('line')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })
  })

  describe('chart types', () => {
    it('should handle line chart', () => {
      const context = createContext('line')
      const spec = createSpec()
      const pipe = dualChartType(createOptions('line'))
      const result = pipe(spec, context) as ISeriesSpec

      expect(result.type).toBe('line')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })

    it('should handle column chart with column z-index', () => {
      const context = createContext('column')
      const spec = createSpec()
      const pipe = dualChartType(createOptions('column'))
      const result = pipe(spec, context) as ISeriesSpec

      expect(result.type).toBe('bar')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
    })

    it('should handle area chart', () => {
      const context = createContext('area')
      const spec = createSpec()
      const pipe = dualChartType(createOptions('area'))
      const result = pipe(spec, context) as ISeriesSpec

      expect(result.type).toBe('area')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })

    it('should handle scatter chart', () => {
      const context = createContext('scatter')
      const spec = createSpec()
      const pipe = dualChartType(createOptions('scatter'))
      const result = pipe(spec, context) as ISeriesSpec

      expect(result.type).toBe('scatter')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })
  })

  describe('columnParallel scenario (both column)', () => {
    it('should handle both measures as column with columnParallel', () => {
      const reshapeMeasures = [
        [
          {
            id: 'measure1',
            chartType: 'column',
            encoding: 'primaryYAxis',
          },
          {
            id: 'measure2',
            chartType: 'column',
            encoding: 'secondaryYAxis',
          },
        ],
      ]
      const context = createContext('column', reshapeMeasures)
      const spec = createSpec({ xField: 'category' })
      const pipe = dualChartType(createOptions('columnParallel'))
      const result = pipe(spec, context) as IBarSeriesSpec

      expect(result.type).toBe('bar')
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
      expect(result.xField).toEqual(['category', 'detail_field'])
    })

    it('should handle array xField', () => {
      const reshapeMeasures = [
        [
          {
            id: 'measure1',
            chartType: 'column',
            encoding: 'primaryYAxis',
          },
          {
            id: 'measure2',
            chartType: 'column',
            encoding: 'secondaryYAxis',
          },
        ],
      ]
      const context = createContext('column', reshapeMeasures)
      const spec = createSpec({ xField: ['cat1', 'cat2'] })
      const pipe = dualChartType(createOptions('columnParallel'))
      const result = pipe(spec, context) as IBarSeriesSpec

      expect(result.xField).toEqual(['cat1', 'cat2', 'detail_field'])
    })
  })

  describe('percent types', () => {
    it('should handle columnPercent', () => {
      const context = createContext('columnPercent')
      const spec = createSpec()
      const pipe = dualChartType(createOptions('columnPercent'))
      const result = pipe(spec, context) as ISeriesSpec

      expect(result.type).toBe('bar')
      expect(result.percent).toBe(true)
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_COLUMN_Z_INDEX)
    })

    it('should handle areaPercent', () => {
      const context = createContext('areaPercent')
      const spec = createSpec()
      const pipe = dualChartType(createOptions('areaPercent'))
      const result = pipe(spec, context) as ISeriesSpec

      expect(result.type).toBe('area')
      expect(result.percent).toBe(true)
      expect(result.zIndex).toBe(DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX)
    })
  })

  describe('fallback behavior', () => {
    it('should use the type even if unknown (passes through)', () => {
      const context = createContext('column' as ChartType)
      const spec = createSpec()
      const pipe = dualChartType(createOptions('unknown' as any))
      const result = pipe(spec, context)

      // The default case in switch passes through the type
      expect(result.type).toBe('unknown')
    })
  })
})
