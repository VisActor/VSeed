import { MeasureName } from 'src/dataReshape'
import { intl } from 'src/i18n'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Datum, Dimension, DimensionTree } from 'src/types'

export const autoDimensions: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dimensions, dataset } = vseed

  const measures = findAllMeasures(advancedVSeed.measures as DimensionTree)

  const MeaName: Dimension = {
    id: MeasureName,
    alias: intl.i18n`指标名称`,
  }

  if (!dataset) {
    throw new Error('dataset is required')
  }

  if (dataset.length === 0) {
    return result
  }

  if (dimensions) {
    result.dimensions = dimensions.map((dim) => ({
      location: 'dimension',
      ...dim,
    }))

    if (result.dimensions.some((dim) => dim.id === MeasureName)) {
      return result
    }

    result.dimensions.push(MeaName)

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
  result.dimensions.push(MeaName)

  return result
}
