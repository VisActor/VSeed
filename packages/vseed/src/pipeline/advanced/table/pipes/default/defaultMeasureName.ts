import { MeasureName } from 'src/dataReshape'
import { intl } from 'src/i18n'
import { findAllMeasures } from 'src/pipeline/utils/measures/find'
import type { AdvancedPipe, Dimension, DimensionTree } from 'src/types'

export const defaultMeasureName: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const measures = findAllMeasures(advancedVSeed.measures as DimensionTree)

  // 如果没有指标名称维度，则默认添加指标名称维度
  if (measures.length > 1 && !result.dimensions?.some((dim) => dim.id === MeasureName)) {
    result.dimensions?.push({
      id: MeasureName,
      alias: intl.i18n`指标名称`,
      encoding: 'column',
    } as Dimension)
  }

  return result
}
