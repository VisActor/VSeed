import { isNullish } from 'remeda'
import { measureDepth } from 'src/pipeline/utils'
import type { AdvancedPipe, Datum, DualAxis, DualMeasures, MeasureGroup, MeasureTree } from 'src/types'

export const autoDualMeasures: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context as {
    vseed: DualAxis
  }
  const { dataset, dualMeasures, measures } = vseed

  if (!dataset) {
    throw new Error('dataset is required')
  }

  if (dataset.length === 0) {
    return result
  }

  if (dualMeasures) {
    result.measures = dualMeasuresToMeasureTree(dualMeasures)
    return result
  }
  if (measures && measureDepth(measures) > 1) {
    result.measures = measures
    return result
  }

  const top100dataset = dataset.slice(0, 100)

  const sample = top100dataset.reduce<Datum>((prev, cur) => {
    return { ...prev, ...cur }
  }, {})

  const newMeasures =
    measures ||
    Object.keys(sample)
      .filter((key) => {
        return top100dataset.some((item) => typeof item[key] === 'number') && !['', null, undefined].includes(key)
      })
      .map((measure) => ({
        id: measure,
        alias: measure,
      }))

  if (newMeasures.length === 0) {
    result.measures = []
    return result
  } else if (newMeasures.length === 1) {
    result.measures = [
      {
        id: 'primary',
        alias: 'primary',
        children: newMeasures,
      },
    ]
    return result
  } else if (newMeasures.length > 1) {
    result.measures = [
      {
        id: 'primary',
        alias: 'primary',
        children: newMeasures.slice(0, 1),
      },
      {
        id: 'secondary',
        alias: 'secondary',
        children: newMeasures.slice(1),
      },
    ]
  }

  return result
}

const dualMeasuresToMeasureTree = (dualMeasures: DualMeasures): MeasureTree => {
  const measureTree = dualMeasures.map((item, index): MeasureGroup => {
    const { primaryMeasures, secondaryMeasures, primaryAlias, secondaryAlias } = item
    const groupChildren: MeasureGroup[] = []

    if (primaryMeasures) {
      const arrPrimaryMeasures = Array.isArray(primaryMeasures) ? primaryMeasures : [primaryMeasures]
      groupChildren.push({
        id: `${index}-primary`,
        alias: primaryAlias || arrPrimaryMeasures.map((item) => item.alias || item.id).toString(),
        children: arrPrimaryMeasures,
      })
    }
    if (secondaryMeasures) {
      const arrSecondaryMeasures = Array.isArray(secondaryMeasures) ? secondaryMeasures : [secondaryMeasures]
      groupChildren.push({
        id: `${index}-secondary`,
        alias: secondaryAlias || arrSecondaryMeasures.map((item) => item.alias || item.id).toString(),
        children: arrSecondaryMeasures,
      })
    }

    const id = [primaryAlias, secondaryAlias, index].filter((d) => !isNullish(d)).join('-')
    return {
      id,
      alias: id,
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
