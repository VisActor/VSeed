import type { IBarSeriesSpec, ISeriesSpec } from '@visactor/vchart'
import type { DualChartType, SpecPipe } from 'src/types'

export const dualChartTypePrimary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISeriesSpec
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

  switch (primary) {
    case 'line': {
      result.type = 'line'
      break
    }
    case 'column': {
      result.type = 'bar'
      break
    }
    case 'columnParallel': {
      const columnSpec = result as IBarSeriesSpec
      if (Array.isArray(columnSpec.xField)) {
        columnSpec.xField.push(datasetReshapeInfo[0].unfoldInfo.groupId)
      } else if (columnSpec.xField) {
        columnSpec.xField = [columnSpec.xField, datasetReshapeInfo[0].unfoldInfo.groupId]
      }
      columnSpec.type = 'bar'
      break
    }
    // @ts-expect-error  'columnPercent' 和 'areaPercent' 会改变轴值域为[0,1], VTable不支持.
    case 'columnPercent': {
      result.type = 'bar'
      result.percent = true
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

export const dualChartTypeSecondary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISeriesSpec
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
  const secondary = Array.isArray(config) ? config[index].secondary || config[0].secondary : config.secondary

  switch (secondary) {
    case 'line': {
      result.type = 'line'
      break
    }
    case 'column': {
      result.type = 'bar'
      break
    }
    case 'columnParallel': {
      const columnSpec = result as IBarSeriesSpec
      if (Array.isArray(columnSpec.xField)) {
        columnSpec.xField.push(datasetReshapeInfo[0].unfoldInfo.groupId)
      } else if (columnSpec.xField) {
        columnSpec.xField = [columnSpec.xField, datasetReshapeInfo[0].unfoldInfo.groupId]
      }
      columnSpec.type = 'bar'
      break
    }
    // @ts-expect-error  'columnPercent' 和 'areaPercent' 会改变轴值域为[0,1], VTable不支持.
    case 'columnPercent': {
      result.type = 'bar'
      result.percent = true
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
