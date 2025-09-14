import type { AdvancedPipe, MeasureGroup, Measures, MeasureTree, Scatter, ScatterMeasures } from 'src/types'
import { isMeasureTreeWithParentId, isMeasureTreeWithChildren } from './utils'
import { clone } from 'remeda'

export const buildMeasuresForScatter: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: Scatter
  }

  // 带Children的指标树, 不进行任何处理
  if (isMeasureTreeWithChildren(advancedVSeed.measures)) {
    return advancedVSeed
  }
  // 带parentId的指标树, 转换为带children的指标树
  if (isMeasureTreeWithParentId(advancedVSeed.measures)) {
    advancedVSeed.measures = generateMeasuresByParentId(advancedVSeed.measures as Measures)
    return advancedVSeed
  }

  /**
   * 既不是带Children的指标树, 也不是带parentId的指标树, 则自动生成指标
   */

  const scatterMeasures = vseed.scatterMeasures
    ? clone(vseed.scatterMeasures)
    : basicMeasuresToScatterMeasures(advancedVSeed.measures || [])
  advancedVSeed.measures = scatterMeasuresToMeasureTree(scatterMeasures)

  return advancedVSeed
}

const basicMeasuresToScatterMeasures = (basicMeasures: Measures): ScatterMeasures => {
  const yMeasures: Measures = []
  const xMeasures: Measures = []

  for (let index = 0; index < basicMeasures.length; index++) {
    const item = basicMeasures[index]
    const encoding = Array.isArray(item.encoding) ? item.encoding : [item.encoding]
    const isYAxis = encoding.includes('yAxis')
    const isXAxis = encoding.includes('xAxis')

    if (isYAxis) {
      yMeasures.push(item)
    } else if (isXAxis) {
      xMeasures.push(item)
    } else {
      if (index !== 0) {
        yMeasures.push(item)
      } else {
        xMeasures.push(item)
      }
    }
  }

  if (yMeasures.length === 0 && xMeasures.length > 0) {
    yMeasures.push(xMeasures[0])
  }

  return [{ id: 'scatterMeasures', xMeasures, yMeasures }]
}

const scatterMeasuresToMeasureTree = (scatterMeasures: ScatterMeasures): MeasureTree => {
  const measureTree = scatterMeasures.map((item, index): MeasureGroup => {
    const { id, xMeasures, yMeasures } = item
    const groupChildren: MeasureGroup[] = []

    let groupId: string = `${id}-`
    if (xMeasures) {
      const arrPrimaryMeasures = Array.isArray(xMeasures) ? xMeasures : [xMeasures]
      const alias = arrPrimaryMeasures.map((item) => item.alias || item.id).toString()
      groupId += alias
      groupChildren.push({
        id: `${index}-x`,
        alias: arrPrimaryMeasures.map((item) => item.alias || item.id).toString(),
        children: arrPrimaryMeasures,
      })
    }
    if (yMeasures) {
      const arrSecondaryMeasures = Array.isArray(yMeasures) ? yMeasures : [yMeasures]
      const alias = arrSecondaryMeasures.map((item) => item.alias || item.id).toString()
      groupId += alias
      groupChildren.push({
        id: `${index}-y`,
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

  // 只有1个散点图, 仅返回2层, vchart 绘制散点图
  if (scatterMeasures.length === 1) {
    return measureTree[0].children || []
  }

  // 有多个散点图, 返回3层, pivot chart 绘制组合散点图
  return measureTree
}

const generateMeasuresByParentId = (measures: Measures) => {
  const scatterMeasures: ScatterMeasures = []

  measures.forEach((item) => {
    if (!item.parentId) {
      return
    }

    if (!scatterMeasures.find((d) => d.id === item.parentId)) {
      scatterMeasures.push({
        id: item.parentId,
        yMeasures: [],
        xMeasures: [],
      })
    }

    const scatterChart = scatterMeasures.find((d) => d.id === item.parentId)
    if (!scatterChart || !Array.isArray(scatterChart.yMeasures) || !Array.isArray(scatterChart.xMeasures)) {
      return
    }

    const encoding = Array.isArray(item.encoding) ? item.encoding : [item.encoding]
    const isX = encoding.includes('xAxis')
    const isY = encoding.includes('yAxis')
    const isEmpty = !encoding.length
    if (isY) {
      scatterChart.yMeasures.push(item)
    } else if (isX) {
      scatterChart.xMeasures.push(item)
    } else if (isEmpty) {
      if (scatterChart.yMeasures.length !== 0) {
        scatterChart.yMeasures.push(item)
      } else {
        scatterChart.xMeasures.push(item)
      }
    }
  })

  return scatterMeasuresToMeasureTree(scatterMeasures)
}
