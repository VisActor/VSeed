import type { AdvancedPipe, AdvancedVSeed, MeasureGroup, Measures, MeasureTree } from 'src/types'
import { isMeasureTreeWithChildren, isMeasureTreeWithParentId, normalizeMeasureTree } from './utils'
import { isPivotChart } from 'src/pipeline/utils'

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
  if (isPivotChart(advancedVSeed as AdvancedVSeed)) {
    advancedVSeed.measures = basicMeasuresToMeasureTree(advancedVSeed.measures as Measures)
  }

  return advancedVSeed
}

const generateMeasuresByParentId = (measures: Measures): MeasureTree => {
  const measureTree: MeasureGroup[] = []

  measures.forEach((measure) => {
    if (!measure.parentId) {
      return
    }

    const parent = measureTree.find((item) => item.id === measure.parentId)

    if (parent && 'children' in parent) {
      parent.children = parent.children || []
      parent.children.push(measure)
    } else {
      measureTree.push({
        id: measure.parentId,
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
