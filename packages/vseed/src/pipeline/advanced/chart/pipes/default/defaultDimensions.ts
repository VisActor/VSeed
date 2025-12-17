import { clone } from 'remeda'
import type { AdvancedPipe, Datum, Dimensions, Measure } from 'src/types'

export const defaultDimensions: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dimensions, dataset } = vseed

  if (dimensions && dimensions.length > 0) {
    return {
      ...result,
      dimensions: clone(dimensions.map((dim) => ({ ...dim, alias: dim.alias || dim.id }))),
    }
  }

  const measures = advancedVSeed.measures as Measure[]

  const top100dataset = dataset.slice(0, 100)

  const sample = top100dataset.reduce<Datum>((prev, cur) => {
    return { ...prev, ...cur }
  }, {})

  const newDimensions = Object.keys(sample)
    .filter(
      (key) =>
        top100dataset.some((item) => typeof item[key] === 'string') &&
        !['', null, undefined].includes(key) &&
        !measures.some((measure) => measure.id === key),
    )
    .map((dim) => ({
      id: dim,
      alias: dim,
    })) as Dimensions

  return {
    ...result,
    dimensions: newDimensions,
  }
}
