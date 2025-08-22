import type { AdvancedPipe, Datum } from 'src/types'

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
