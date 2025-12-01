import type { AdvancedPipe, MeasureGroup, Measures, MeasureTree, VSeed } from 'src/types'
import { isMeasureTreeWithChildren, isMeasureTreeWithParentId, normalizeMeasureTree } from './utils'
import { isPivotChart } from 'src/pipeline/utils'
import { DEFAULT_PARENT_ID } from 'src/pipeline/utils/constant'
import { isValid } from '@visactor/vutils'

export const buildMeasures: AdvancedPipe = (advancedVSeed) => {
  // 带Children的指标树, 不进行任何处理
  if (isMeasureTreeWithChildren(advancedVSeed.measures)) {
    advancedVSeed.measures = normalizeMeasureTree(advancedVSeed.measures as MeasureTree)
    return advancedVSeed
  }
  // 带parentId的指标树, 转换为带children的指标树
  if (isMeasureTreeWithParentId(advancedVSeed.measures)) {
    advancedVSeed.measures = generateMeasuresByParentId(advancedVSeed.measures as Measures)
    return advancedVSeed
  }

  /**
   * 透视图表, 自动生成指标树
   */
  if (isPivotChart(advancedVSeed as VSeed)) {
    advancedVSeed.measures = basicMeasuresToMeasureTree(advancedVSeed.measures as Measures)
  }

  return advancedVSeed
}

const generateMeasuresByParentId = (measures: Measures): MeasureTree => {
  const measureTree: MeasureGroup[] = []

  measures.forEach((measure) => {
    const parent = measureTree.find((item) => item.id === measure.parentId)
    if (parent && 'children' in parent) {
      parent.children = parent.children || []

      if (parent.children.length > 0) {
        parent.alias += `-${measure.alias ?? measure.id}`
      }

      parent.children.push(measure)
    } else if (isValid(measure.parentId)) {
      measureTree.push({
        id: measure.parentId,
        alias: measure.alias ?? measure.id,
        children: [measure],
      })
    } else {
      measureTree.push({
        id: DEFAULT_PARENT_ID,
        alias: measure.alias ?? measure.id, // 当分组只有单个指标的时候，分组alias 设置为该指标的别名或者id
        children: [measure],
      })
    }
  })

  return measureTree
}

const basicMeasuresToMeasureTree = (measures: Measures): MeasureTree => {
  const id = measures.map((item) => item.id).join('-')
  const alias = measures.map((item) => item.alias || item.id).join('-')
  return [
    {
      id,
      alias,
      children: measures,
    },
  ]
}
