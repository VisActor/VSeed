import { MeasureName } from 'src/dataReshape'
import { intl } from 'src/i18n'
import { findAllDimensions, findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Datum, Dimension, Dimensions, Measures } from 'src/types'

export const autoPivotDimensions: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dimensions, dataset } = vseed

  const measures = findAllMeasures(advancedVSeed.measures as Measures)

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
    const newDimensions = findAllDimensions(dimensions) as Dimensions
    if (!newDimensions.some((dim) => dim.id === MeasureName)) {
      newDimensions.push(MeaName)
    }

    result.dimensions = newDimensions.map((item, index) => {
      if (item.encoding === 'row' || item.encoding === 'column') {
        return item
      }

      return {
        ...item,
        encoding: index % 2 === 0 ? 'column' : 'row',
      }
    }) as Dimensions

    return result
  }

  const top100dataset = dataset.slice(0, 100)

  const sample = top100dataset.reduce<Datum>((prev, cur) => {
    return { ...prev, ...cur }
  }, {})

  const newDimensions = Object.keys(sample).filter(
    (key) =>
      top100dataset.some((item) => typeof item[key] === 'string') &&
      !['', null, undefined].includes(key) &&
      !measures.some((measure) => measure.id === key),
  ) as unknown as Dimensions

  result.dimensions = newDimensions.map((dim) => ({
    id: dim,
    alias: dim,
  })) as unknown as Dimensions
  result.dimensions.push(MeaName)
  result.dimensions = result.dimensions.map((dim, index) => ({
    ...dim,
    encoding: index % 2 === 0 ? 'column' : 'row',
  }))
  return result
}
