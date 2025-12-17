import { MeasureId } from 'src/dataReshape'
import { intl } from 'src/i18n'
import { findAllMeasures } from 'src/pipeline/utils/measures/find'
import { findTreeNodesBy } from 'src/pipeline/utils/tree/traverse'
import type { AdvancedPipe, Dimension, MeasureTree } from 'src/types'

export const defaultMeasureId: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const measures = findAllMeasures(advancedVSeed.measureTree as MeasureTree)

  // 如果没有指标名称维度，则默认添加指标名称维度
  if (measures.length > 1 && !findTreeNodesBy(advancedVSeed.dimensionTree, (dim) => dim.id === MeasureId).length) {
    result.dimensionTree!.push({
      id: MeasureId,
      alias: intl.i18n`指标名称`,
      encoding: 'row',
    } as Dimension)
  }

  return result
}
