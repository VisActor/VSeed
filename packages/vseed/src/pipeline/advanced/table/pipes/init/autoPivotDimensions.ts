import { findAllDimensions, findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Datum, Dimensions, Measures } from 'src/types'

export const autoPivotDimensions: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dimensions, dataset } = vseed

  const measures = findAllMeasures(advancedVSeed.measures as Measures)

  if (!dataset) {
    throw new Error('dataset is required')
  }

  if (dataset.length === 0) {
    return result
  }

  if (dimensions) {
    const newDimensions = findAllDimensions(dimensions) as Dimensions
    result.dimensions = newDimensions.map((item, index) => {
      if (item.location === 'rowDimension' || item.location === 'columnDimension') {
        return item
      }
      return {
        ...item,
        location: index % 2 === 0 ? 'columnDimension' : 'rowDimension',
      }
    }) as Dimensions

    return result
  }

  const top100dataset = dataset.slice(0, 100)

  const sample = top100dataset.reduce<Datum>((prev, cur) => {
    return { ...prev, ...cur }
  }, {})

  let i = 0
  result.dimensions = Object.keys(sample)
    .filter(
      (key) =>
        top100dataset.some((item) => typeof item[key] === 'string') &&
        !['', null, undefined].includes(key) &&
        !measures.some((measure) => measure.id === key),
    )
    .map((dim) => ({
      id: dim,
      alias: dim,
      location: i++ % 2 === 0 ? 'columnDimension' : 'rowDimension',
    })) as Dimensions

  return result
}
