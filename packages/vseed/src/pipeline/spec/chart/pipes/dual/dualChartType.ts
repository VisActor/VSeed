import type { IBarSeriesSpec, ISeriesSpec } from '@visactor/vchart'
import { DUAL_AXIS_CHART_COLUMN_Z_INDEX, DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX } from 'src/pipeline/utils/constant'
import type { DualChartType, VChartSpecPipe } from 'src/types'

export const dualChartTypePrimary: VChartSpecPipe = (spec, context) => {
  const result = { ...spec, zIndex: DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX } as ISeriesSpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { datasetReshapeInfo } = advancedVSeed
  const index = datasetReshapeInfo[0].index

  const config =
    advancedVSeed.config?.[chartType as 'dualAxis']?.dualChartType ||
    ({
      primary: 'column',
      secondary: 'line',
    } as DualChartType)

  const primary = Array.isArray(config) ? config[index].primary || config[0].primary : config.primary
  const secondary = Array.isArray(config) ? config[index].secondary || config[0].secondary : config.secondary
  const bothColumn = primary === 'column' && secondary === 'column'
  const type = bothColumn ? 'columnParallel' : primary
  switch (type) {
    case 'line': {
      result.type = 'line'
      break
    }
    case 'column': {
      result.type = 'bar'
      result.zIndex = DUAL_AXIS_CHART_COLUMN_Z_INDEX
      break
    }
    case 'columnParallel': {
      const columnSpec = result as IBarSeriesSpec
      if (Array.isArray(columnSpec.xField)) {
        columnSpec.xField.push(datasetReshapeInfo[0].unfoldInfo.encodingDetail)
      } else if (columnSpec.xField) {
        columnSpec.xField = [columnSpec.xField, datasetReshapeInfo[0].unfoldInfo.encodingDetail]
      }
      columnSpec.type = 'bar'
      result.zIndex = DUAL_AXIS_CHART_COLUMN_Z_INDEX
      break
    }
    // @ts-expect-error  'columnPercent' 和 'areaPercent' 会改变轴值域为[0,1], VTable不支持.
    case 'columnPercent': {
      result.type = 'bar'
      result.percent = true
      result.zIndex = DUAL_AXIS_CHART_COLUMN_Z_INDEX
      break
    }
    case 'area': {
      result.type = 'area'
      break
    }
    // @ts-expect-error  'columnPercent' 和 'areaPercent' 会改变轴值域为[0,1], VTable不支持.
    case 'areaPercent': {
      result.type = 'area'
      result.percent = true
      break
    }
    case 'scatter': {
      result.type = 'scatter'
      break
    }
    default:
      result.type = primary
  }

  return result
}

export const dualChartTypeSecondary: VChartSpecPipe = (spec, context) => {
  const result = { ...spec, zIndex: DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX } as ISeriesSpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { datasetReshapeInfo } = advancedVSeed
  const config =
    advancedVSeed.config?.[chartType as 'dualAxis']?.dualChartType ||
    ({
      primary: 'column',
      secondary: 'line',
    } as DualChartType)

  const index = datasetReshapeInfo[0].index
  const primary = Array.isArray(config) ? config[index].primary || config[0].primary : config.primary
  const secondary = Array.isArray(config) ? config[index].secondary || config[0].secondary : config.secondary
  const bothColumn = primary === 'column' && secondary === 'column'
  const type = bothColumn ? 'columnParallel' : secondary

  switch (type) {
    case 'line': {
      result.type = 'line'
      break
    }
    case 'column': {
      result.type = 'bar'
      result.zIndex = DUAL_AXIS_CHART_COLUMN_Z_INDEX
      break
    }
    case 'columnParallel': {
      const columnSpec = result as IBarSeriesSpec
      if (Array.isArray(columnSpec.xField)) {
        columnSpec.xField.push(datasetReshapeInfo[0].unfoldInfo.encodingDetail)
      } else if (columnSpec.xField) {
        columnSpec.xField = [columnSpec.xField, datasetReshapeInfo[0].unfoldInfo.encodingDetail]
      }
      columnSpec.type = 'bar'
      result.zIndex = DUAL_AXIS_CHART_COLUMN_Z_INDEX
      break
    }
    // @ts-expect-error  'columnPercent' 和 'areaPercent' 会改变轴值域为[0,1], VTable不支持.
    case 'columnPercent': {
      result.type = 'bar'
      result.percent = true
      result.zIndex = DUAL_AXIS_CHART_COLUMN_Z_INDEX
      break
    }
    case 'area': {
      result.type = 'area'
      break
    }
    // @ts-expect-error  'columnPercent' 和 'areaPercent' 会改变轴值域为[0,1], VTable不支持.
    case 'areaPercent': {
      result.type = 'area'
      result.percent = true
      break
    }
    case 'scatter': {
      result.type = 'scatter'
      break
    }
    default:
      result.type = secondary
  }

  return result
}
