import type { IBarSeriesSpec, ISeriesSpec } from '@visactor/vchart'
import type { DualChartType, SpecPipe } from 'src/types'

export const dualChartTypePrimary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISeriesSpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { datasetReshapeInfo } = advancedVSeed
  const config = advancedVSeed.config?.[chartType as 'dualAxis']?.dualChartType as DualChartType

  if (Array.isArray(config)) {
    return result
  }

  switch (config.primary) {
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
    case 'columnPercent': {
      result.type = 'bar'
      result.percent = true
      break
    }
    case 'area': {
      result.type = 'area'
      break
    }
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
      result.type = config.primary
  }

  return result
}

export const dualChartTypeSecondary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ISeriesSpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { datasetReshapeInfo } = advancedVSeed
  const config = advancedVSeed.config?.[chartType as 'dualAxis']?.dualChartType as DualChartType

  if (Array.isArray(config)) {
    return result
  }

  switch (config.secondary) {
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
    case 'columnPercent': {
      result.type = 'bar'
      result.percent = true
      break
    }
    case 'area': {
      result.type = 'area'
      break
    }
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
      result.type = config.secondary
  }

  return result
}
