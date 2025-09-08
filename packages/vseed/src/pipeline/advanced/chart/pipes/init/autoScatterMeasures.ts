import { measureDepth } from 'src/pipeline/utils'
import type { AdvancedPipe, Datum, MeasureGroup, MeasureTree, Scatter, ScatterMeasures } from 'src/types'

export const autoScatterMeasures: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context as {
    vseed: Scatter
  }
  const { dataset, scatterMeasures, measures } = vseed

  if (!dataset) {
    throw new Error('dataset is required')
  }

  if (dataset.length === 0) {
    return result
  }

  if (scatterMeasures) {
    result.measures = scatterMeasuresToMeasureTree(scatterMeasures)
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

const scatterMeasuresToMeasureTree = (scatterMeasures: ScatterMeasures): MeasureTree => {
  const measureTree = scatterMeasures.map((item, index): MeasureGroup => {
    const { xMeasures, yMeasures } = item
    const groupChildren: MeasureGroup[] = []

    let id: string = ''
    if (xMeasures) {
      const arrXMeasures = Array.isArray(xMeasures) ? xMeasures : [xMeasures]
      const alias = arrXMeasures.map((item) => item.alias || item.id).toString()
      id += alias
      groupChildren.push({
        id: `${index}-x`,
        alias: arrXMeasures.map((item) => item.alias || item.id).toString(),
        children: arrXMeasures,
      })
    }
    if (yMeasures) {
      const arrYMeasures = Array.isArray(yMeasures) ? yMeasures : [yMeasures]
      const alias = arrYMeasures.map((item) => item.alias || item.id).toString()
      id += alias
      groupChildren.push({
        id: `${index}-y`,
        alias: arrYMeasures.map((item) => item.alias || item.id).toString(),
        children: arrYMeasures,
      })
    }

    return {
      id,
      alias: id,
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
