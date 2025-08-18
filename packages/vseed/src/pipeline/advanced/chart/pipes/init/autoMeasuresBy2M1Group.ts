import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Datum, MeasureGroup, MeasureTree } from 'src/types'

/**
 * 自动处理指标, 如果超出了2个指标, 则按每2个指标一个组的逻辑维护
 * @param advancedVSeed
 * @param context
 * @returns
 */
export const autoMeasuresBy2M1Group: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { measures, dataset } = vseed

  if (!dataset) {
    throw new Error('dataset is required')
  }

  if (dataset.length === 0) {
    return result
  }

  if (measures) {
    result.measures = auto2M1Group(measures)
    return result
  }

  const top100dataset = dataset.slice(0, 100)

  const sample = top100dataset.reduce<Datum>((prev, cur) => {
    return { ...prev, ...cur }
  }, {})

  const newMeasures = Object.keys(sample)
    .filter((key) => {
      return top100dataset.some((item) => typeof item[key] === 'number') && !['', null, undefined].includes(key)
    })
    .map((measure) => ({
      id: measure,
      alias: measure,
    }))

  result.measures = auto2M1Group(newMeasures)
  return result
}

const auto2M1Group = (measures: MeasureTree): MeasureTree => {
  const allMeasures = findAllMeasures(measures)

  if (allMeasures.length <= 2) {
    return allMeasures
  }

  const groups: MeasureTree = measures.filter((measure) => 'children' in measure)
  const singleMeasures = measures.filter((measure) => !('children' in measure))
  for (let i = 0; i < singleMeasures.length; i += 2) {
    const group = createEmptyMeasureGroup()
    group.children = allMeasures.slice(i, i + 2)
    groups.push(group)
  }
  return groups as MeasureGroup[]
}

const createEmptyMeasureGroup = (): MeasureGroup => {
  return {
    id: '',
    alias: '',
    children: [],
  }
}
