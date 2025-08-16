import type { AdvancedPipe, Datum } from 'src/types'

export const autoDimensions: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dimensions, dataset } = vseed

  const { measures = [] } = advancedVSeed
  if (!dataset) {
    throw new Error('dataset is required')
  }

  if (dataset.length === 0) {
    return result
  }

  if (dimensions) {
    result.dimensions = dimensions
    return result
  }

  const top100dataset = dataset.slice(0, 100)

  const sample = top100dataset.reduce<Datum>((prev, cur) => {
    return { ...prev, ...cur }
  }, {})

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
      location: 'dimension',
    }))

  return result
}
