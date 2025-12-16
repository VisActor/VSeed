import type { IBarSeriesSpec, ISeriesSpec } from '@visactor/vchart'
import { DUAL_AXIS_CHART_COLUMN_Z_INDEX, DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX } from 'src/pipeline/utils/constant'
import type { DualAxisMeasure, DualChartType, VChartSpecPipe } from 'src/types'
import type { Measure } from 'src/types/properties'

const DEFAULT_DUAL_CHART_TYPE: DualChartType = {
  primary: 'column',
  secondary: 'line',
}

/**
 * 获取双轴图的图表类型配置
 * @param userConfig 用户配置的图表类型
 * @param index 当前数据集索引
 * @param reshapeMeasures 重塑后的度量数据
 * @returns 主轴和次轴的图表类型
 */
function getDualChartTypes(
  userConfig: DualChartType | DualChartType[] | null | undefined,
  index: number,
  reshapeMeasures: Measure[][] = [],
): { primary: string; secondary: string } {
  let primary = DEFAULT_DUAL_CHART_TYPE.primary
  let secondary = DEFAULT_DUAL_CHART_TYPE.secondary

  const config = Array.isArray(userConfig) ? (userConfig[index] ?? userConfig[0]) : userConfig

  // 获取主轴图表类型
  if (config?.primary) {
    primary = config.primary
  } else if (reshapeMeasures[index]) {
    const primaryMeasures = reshapeMeasures[index].filter(
      (m) => m.encoding === 'primaryYAxis' && (m as DualAxisMeasure).chartType,
    )

    if (primaryMeasures.length) {
      primary = (primaryMeasures[primaryMeasures.length - 1] as DualAxisMeasure).chartType!
    }
  }

  // 获取次轴图表类型
  if (config?.secondary) {
    secondary = config.secondary
  } else if (reshapeMeasures[index]) {
    const secondaryMeasures = reshapeMeasures[index].filter(
      (m) => m.encoding === 'secondaryYAxis' && (m as DualAxisMeasure).chartType,
    )

    if (secondaryMeasures.length) {
      secondary = (secondaryMeasures[secondaryMeasures.length - 1] as DualAxisMeasure).chartType!
    }
  }

  return { primary, secondary }
}

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

export const dualChartTypePrimary: VChartSpecPipe = (spec, context) => {
  const result = { ...spec, zIndex: DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX } as ISeriesSpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { datasetReshapeInfo, reshapeMeasures = [] } = advancedVSeed
  const index = datasetReshapeInfo[0].index

  const userConfig = advancedVSeed.config?.[chartType as 'dualAxis']?.dualChartType
  const { primary, secondary } = getDualChartTypes(userConfig, index, reshapeMeasures)
  const bothColumn = primary === 'column' && secondary === 'column'
  const type = bothColumn ? 'columnParallel' : primary

  applyChartType(result, type, datasetReshapeInfo)

  return result
}

export const dualChartTypeSecondary: VChartSpecPipe = (spec, context) => {
  const result = { ...spec, zIndex: DUAL_AXIS_CHART_NON_COLUMN_Z_INDEX } as ISeriesSpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { datasetReshapeInfo, reshapeMeasures = [] } = advancedVSeed
  const index = datasetReshapeInfo[0].index

  const userConfig = advancedVSeed.config?.[chartType as 'dualAxis']?.dualChartType
  const { primary, secondary } = getDualChartTypes(userConfig, index, reshapeMeasures)

  const bothColumn = primary === 'column' && secondary === 'column'
  const type = bothColumn ? 'columnParallel' : secondary

  applyChartType(result, type, datasetReshapeInfo)

  return result
}
