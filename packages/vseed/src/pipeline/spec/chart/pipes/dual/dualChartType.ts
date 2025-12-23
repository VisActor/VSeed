import type { IBarSeriesSpec, ISeriesSpec } from '@visactor/vchart'
import { DUAL_AXIS_CHART_COLUMN_Z_INDEX, DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX } from 'src/pipeline/utils/constant'
import type { VChartSpecPipe } from 'src/types'
import type { DualAxisOptions } from 'src/types/properties'

/**
 * 应用图表类型到 spec
 * @param result spec 结果对象
 * @param type 图表类型
 * @param datasetReshapeInfo 数据集重塑信息
 */
function applyChartType(result: ISeriesSpec, type: string, datasetReshapeInfo: any): void {
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
      result.type = type
  }
}

export const dualChartType = (options: DualAxisOptions): VChartSpecPipe => {
  return (spec, context) => {
    const result = { ...spec, zIndex: DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX } as ISeriesSpec
    const { advancedVSeed } = context
    const { datasetReshapeInfo } = advancedVSeed

    applyChartType(result, options.chartType, datasetReshapeInfo)

    return result
  }
}
