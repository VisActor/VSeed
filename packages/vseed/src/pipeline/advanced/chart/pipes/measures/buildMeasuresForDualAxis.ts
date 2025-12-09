import type { AdvancedPipe, DualAxis, DualMeasures, MeasureGroup, Measures, MeasureTree } from 'src/types'
import { isMeasureTreeWithParentId, isMeasureTreeWithChildren } from './utils'
import { clone } from 'remeda'
import { DEFAULT_PARENT_ID } from 'src/pipeline/utils/constant'

export const buildMeasuresForDualAxis: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: DualAxis
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

  if (vseed.dualMeasures) {
    advancedVSeed.measures = dualMeasuresToMeasureTree(clone(vseed.dualMeasures))

    return advancedVSeed
  }

  const { dualMeasures, encodedMeasures } = basicMeasuresToDualMeasures(advancedVSeed.measures || [])
  advancedVSeed.measures = dualMeasuresToMeasureTree(dualMeasures)

  if (encodedMeasures.length) {
    encodedMeasures.forEach((m) => {
      advancedVSeed.measures!.push(m)
    })
  }

  return advancedVSeed
}

const basicMeasuresToDualMeasures = (basicMeasures: Measures) => {
  const primaryMeasures: Measures = []
  const secondaryMeasures: Measures = []
  const encodedMeasures: Measures = []

  for (let index = 0; index < basicMeasures.length; index++) {
    const item = basicMeasures[index]
    const encoding = item.encoding
    const isPrimaryYAxis = encoding === 'primaryYAxis'
    const isSecondaryYAxis = encoding === 'secondaryYAxis'
    const isOtherEncoding = item.encoding && ['color', 'label', 'tooltip', 'detail'].includes(item.encoding)

    if (isPrimaryYAxis) {
      primaryMeasures.push(item)
    } else if (isSecondaryYAxis) {
      secondaryMeasures.push(item)
    } else if (!isOtherEncoding) {
      if (index === 0) {
        primaryMeasures.push(item)
      } else {
        secondaryMeasures.push(item)
      }
    } else {
      encodedMeasures.push(item)
    }
  }

  return {
    dualMeasures: [{ id: 'dualMeasures', primaryMeasures, secondaryMeasures }],
    encodedMeasures,
  }
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
  const encodedMeasures: Measures = []

  measures.forEach((item) => {
    const id = item.parentId || DEFAULT_PARENT_ID
    if (!dualMeasures.find((d) => d.id === id)) {
      dualMeasures.push({
        id,
        primaryMeasures: [],
        secondaryMeasures: [],
      })
    }

    const dualChart = dualMeasures.find((d) => d.id === id)
    if (!dualChart || !Array.isArray(dualChart.primaryMeasures) || !Array.isArray(dualChart.secondaryMeasures)) {
      return
    }

    const encoding = item.encoding
    const isPrimaryYAxis = encoding === 'primaryYAxis'
    const isSecondaryYAxis = encoding === 'secondaryYAxis'
    const isOtherEncoding = item.encoding && ['color', 'label', 'tooltip', 'detail'].includes(item.encoding)

    if (isPrimaryYAxis) {
      dualChart.primaryMeasures.push(item)
    } else if (isSecondaryYAxis) {
      dualChart.secondaryMeasures.push(item)
    } else if (!isOtherEncoding) {
      if (dualChart.primaryMeasures.length === 0) {
        dualChart.primaryMeasures.push(item)
      } else {
        dualChart.secondaryMeasures.push(item)
      }
    } else {
      encodedMeasures.push(item)
    }
  })

  const res = dualMeasuresToMeasureTree(dualMeasures)

  if (encodedMeasures.length) {
    encodedMeasures.forEach((m) => {
      res.push(m)
    })
  }

  return res
}
