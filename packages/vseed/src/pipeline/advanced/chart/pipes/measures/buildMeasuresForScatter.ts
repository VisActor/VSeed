import type { AdvancedPipe, MeasureGroup, Measures, MeasureTree, Scatter, ScatterMeasures } from 'src/types'
import { isMeasureTreeWithParentId, isMeasureTreeWithChildren } from './utils'
import { clone } from 'remeda'
import { DEFAULT_PARENT_ID } from 'src/pipeline/utils/constant'

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

  if (vseed.scatterMeasures) {
    advancedVSeed.measures = scatterMeasuresToMeasureTree(clone(vseed.scatterMeasures))

    return advancedVSeed
  }

  const { scatterMeasures, encodedMeasures } = basicMeasuresToScatterMeasures(advancedVSeed.measures || [])
  advancedVSeed.measures = scatterMeasuresToMeasureTree(scatterMeasures)

  if (encodedMeasures.length) {
    encodedMeasures.forEach((m) => {
      advancedVSeed.measures!.push(m)
    })
  }

  return advancedVSeed
}

const basicMeasuresToScatterMeasures = (basicMeasures: Measures) => {
  const yMeasures: Measures = []
  const xMeasures: Measures = []
  const encodedMeasures: Measures = []

  for (let index = 0; index < basicMeasures.length; index++) {
    const item = basicMeasures[index]
    const encoding = item.encoding
    const isYAxis = encoding === 'yAxis'
    const isXAxis = encoding === 'xAxis'
    const isOther = encoding && ['color', 'label', 'tooltip', 'detail'].includes(encoding)

    if (isYAxis) {
      yMeasures.push(item)
    } else if (isXAxis) {
      xMeasures.push(item)
    } else if (!isOther) {
      if (index !== 0) {
        yMeasures.push(item)
      } else {
        xMeasures.push(item)
      }
    } else {
      encodedMeasures.push(item)
    }
  }

  if (yMeasures.length === 0 && xMeasures.length > 0) {
    yMeasures.push(xMeasures[0])
  }

  return {
    scatterMeasures: [{ id: 'scatterMeasures', xMeasures, yMeasures }],
    encodedMeasures,
  }
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
  const encodedMeasures: Measures = []

  measures.forEach((item) => {
    const id = item.parentId || DEFAULT_PARENT_ID

    if (!scatterMeasures.find((d) => d.id === id)) {
      scatterMeasures.push({
        id,
        yMeasures: [],
        xMeasures: [],
      })
    }
    const scatterChart = scatterMeasures.find((d) => d.id === id)
    if (!scatterChart || !Array.isArray(scatterChart.yMeasures) || !Array.isArray(scatterChart.xMeasures)) {
      return
    }

    const encoding = Array.isArray(item.encoding) ? item.encoding : [item.encoding].filter(Boolean)
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
    } else {
      encodedMeasures.push(item)
    }
  })

  const res = scatterMeasuresToMeasureTree(scatterMeasures)

  if (encodedMeasures.length) {
    encodedMeasures.forEach((m) => {
      res.push(m)
    })
  }

  return res
}
