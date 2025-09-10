import type { AdvancedPipe, Column, MeasureGroup, Measures, MeasureTree } from 'src/types'
import { getBasicMeasures, isMeasureTreeWithChildren, isMeasureTreeWithParentId } from './utils'
import { isPivotChart } from 'src/pipeline/utils'

export const buildMeasures: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: Column
  }

  // 带Children的指标树, 不进行任何处理
  if (isMeasureTreeWithChildren(vseed)) {
    advancedVSeed.measures = vseed.measures
    return advancedVSeed
  }
  // 带parentId的指标树, 转换为带children的指标树
  if (isMeasureTreeWithParentId(vseed)) {
    advancedVSeed.measures = generateMeasuresByParentId(vseed.measures as Measures)
    return advancedVSeed
  }

  /**
   * 既不是带Children的指标树, 也不是带parentId的指标树, 则自动生成指标
   */
  const basicMeasures = getBasicMeasures(vseed)

  if (isPivotChart(vseed)) {
    advancedVSeed.measures = basicMeasuresToMeasureTree(basicMeasures)
  } else {
    advancedVSeed.measures = basicMeasures
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
