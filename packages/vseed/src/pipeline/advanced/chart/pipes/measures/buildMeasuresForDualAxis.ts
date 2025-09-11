import type { AdvancedPipe, DualAxis, DualMeasures, MeasureGroup, Measures, MeasureTree } from 'src/types'
import { getBasicMeasures, isMeasureTreeWithParentId, isMeasureTreeWithChildren } from './utils'

export const buildMeasuresForDualAxis: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: DualAxis
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

  const dualMeasures = vseed.dualMeasures ? vseed.dualMeasures : basicMeasuresToDualMeasures(basicMeasures)
  advancedVSeed.measures = dualMeasuresToMeasureTree(dualMeasures)

  return advancedVSeed
}

const basicMeasuresToDualMeasures = (basicMeasures: Measures): DualMeasures => {
  const primaryMeasures: Measures = []
  const secondaryMeasures: Measures = []

  for (let index = 0; index < basicMeasures.length; index++) {
    const item = basicMeasures[index]
    const encoding = Array.isArray(item.encoding) ? item.encoding : [item.encoding]
    const isPrimaryYAxis = encoding.includes('primaryYAxis')
    const isSecondaryYAxis = encoding.includes('secondaryYAxis')

    if (isPrimaryYAxis) {
      primaryMeasures.push(item)
    } else if (isSecondaryYAxis) {
      secondaryMeasures.push(item)
    } else {
      if (index === 0) {
        primaryMeasures.push(item)
      } else {
        secondaryMeasures.push(item)
      }
    }
  }

  return [{ id: 'dualMeasures', primaryMeasures, secondaryMeasures }]
}

const dualMeasuresToMeasureTree = (dualMeasures: DualMeasures): MeasureTree => {
  const measureTree = dualMeasures.map((item, index): MeasureGroup => {
    const { id, primaryMeasures, secondaryMeasures } = item
    const groupChildren: MeasureGroup[] = []

    let groupId: string = `${id}-`
    if (primaryMeasures) {
      const arrPrimaryMeasures = Array.isArray(primaryMeasures) ? primaryMeasures : [primaryMeasures]
      const alias = arrPrimaryMeasures.map((item) => item.alias || item.id).toString()
      groupId += alias
      groupChildren.push({
        id: `${index}-primary`,
        alias: arrPrimaryMeasures.map((item) => item.alias || item.id).toString(),
        children: arrPrimaryMeasures,
      })
    }
    if (secondaryMeasures) {
      const arrSecondaryMeasures = Array.isArray(secondaryMeasures) ? secondaryMeasures : [secondaryMeasures]
      const alias = arrSecondaryMeasures.map((item) => item.alias || item.id).toString()
      groupId += alias
      groupChildren.push({
        id: `${index}-secondary`,
        alias: arrSecondaryMeasures.map((item) => item.alias || item.id).toString(),
        children: arrSecondaryMeasures,
      })
    }

    return {
      id: groupId,
      alias: groupId,
      children: groupChildren,
    }
  })

  // 只有1个双轴图, 仅返回2层, vchart 绘制双轴图
  if (dualMeasures.length === 1) {
    return measureTree[0].children || []
  }

  // 有多个双轴图, 返回3层, pivot chart 绘制组合双轴图
  return measureTree
}

const generateMeasuresByParentId = (measures: Measures) => {
  const dualMeasures: DualMeasures = []

  measures.forEach((item) => {
    if (!item.parentId) {
      return
    }

    if (!dualMeasures.find((d) => d.id === item.parentId)) {
      dualMeasures.push({
        id: item.parentId,
        primaryMeasures: [],
        secondaryMeasures: [],
      })
    }

    const dualChart = dualMeasures.find((d) => d.id === item.parentId)
    if (!dualChart || !Array.isArray(dualChart.primaryMeasures) || !Array.isArray(dualChart.secondaryMeasures)) {
      return
    }

    const encoding = Array.isArray(item.encoding) ? item.encoding : [item.encoding]
    const isPrimary = encoding.includes('primaryYAxis')
    const isSecondary = encoding.includes('secondaryYAxis')
    const isEmpty = !item.encoding

    if (isPrimary) {
      dualChart.primaryMeasures.push(item)
    } else if (isSecondary) {
      dualChart.secondaryMeasures.push(item)
    } else if (isEmpty) {
      if (dualChart.primaryMeasures.length === 0) {
        dualChart.primaryMeasures.push(item)
      } else {
        dualChart.secondaryMeasures.push(item)
      }
    }
  })

  return dualMeasuresToMeasureTree(dualMeasures)
}
