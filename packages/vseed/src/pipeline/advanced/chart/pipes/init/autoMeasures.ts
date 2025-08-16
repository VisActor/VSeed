import { isPivotChart } from 'src/pipeline/utils'
import type { AdvancedPipe, Datum, DimensionGroup } from 'src/types'

export const autoMeasures: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { measures, dataset } = vseed

  if (!dataset) {
    throw new Error('dataset is required')
  }

  if (dataset.length === 0) {
    return result
  }

  if (isPivotChart(vseed)) {
    return autoMeasureGroup(advancedVSeed, context)
  }

  if (measures) {
    result.measures = measures
    return result
  }

  const top100dataset = dataset.slice(0, 100)

  const sample = top100dataset.reduce<Datum>((prev, cur) => {
    return { ...prev, ...cur }
  }, {})

  result.measures = Object.keys(sample)
    .filter((key) => {
      return top100dataset.some((item) => typeof item[key] === 'number') && !['', null, undefined].includes(key)
    })
    .map((measure) => ({
      id: measure,
      alias: measure,
    }))

  return result
}

const autoMeasureGroup: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { measures } = vseed
  const hasMeasureGroup = measures?.some((measure: DimensionGroup) => measure.children)

  if (!measures) {
    return advancedVSeed
  }

  // 没有指标组, 则自动添加一个指标组
  if (!hasMeasureGroup) {
    const newMeasures = [
      {
        id: 'measureGroup',
        alias: 'measureGroup',
        children: measures,
      },
    ]
    return {
      ...advancedVSeed,
      measures: newMeasures,
    }
  }

  // 存在指标组, 则任意连续的独立指标成组
  let currentGroup: DimensionGroup = createEmptyMeasureGroup()
  const measureGroups: DimensionGroup[] = []
  for (const measure of measures) {
    if ('children' in measure) {
      // 当前指标组之前的所有独立指标成组
      if (currentGroup.children?.length) {
        currentGroup.alias = currentGroup.children.map((item) => item.alias).join('-')
        currentGroup.id = currentGroup.alias + currentGroup.children.map((item) => item.id).join('-')
        measureGroups.push(currentGroup)
        currentGroup = createEmptyMeasureGroup()
      }
      // 当前是指标组
      measureGroups.push(measure)
    } else {
      currentGroup.children?.push(measure)
    }
  }

  // 最后一组
  if (currentGroup.children?.length) {
    currentGroup.alias = currentGroup.children.map((item) => item.alias).join('-')
    currentGroup.id = currentGroup.alias + currentGroup.children.map((item) => item.id).join('-')
    measureGroups.push(currentGroup)
    currentGroup = createEmptyMeasureGroup()
  }

  advancedVSeed.measures = measureGroups
  return advancedVSeed
}

const createEmptyMeasureGroup = () => {
  return {
    id: '',
    alias: '',
    children: [],
  }
}
