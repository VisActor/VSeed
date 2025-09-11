import { MeasureName } from 'src/dataReshape'
import { intl } from 'src/i18n'
import type { Datum, Dimension, Dimensions, VSeed } from 'src/types'

export const getBasicDimensions = (vseed: VSeed): Dimensions => {
  const { dimensions, dataset } = vseed

  const MeaName: Dimension = {
    id: MeasureName,
    alias: intl.i18n`指标名称`,
  }

  if (!dataset) {
    throw new Error('dataset is required')
  }

  if (dataset.length === 0) {
    return []
  }

  if (dimensions) {
    const basicDimensions = dimensions.map((dim) => ({
      location: 'dimension',
      ...dim,
    })) as Dimensions

    if (basicDimensions.some((dim) => dim.id === MeasureName)) {
      return basicDimensions
    }

    basicDimensions.push(MeaName)

    return basicDimensions
  }

  const top100dataset = dataset.slice(0, 100)

  const sample = top100dataset.reduce<Datum>((prev, cur) => {
    return { ...prev, ...cur }
  }, {})

  const basicDimensions = Object.keys(sample)
    .filter(
      (key) => top100dataset.some((item) => typeof item[key] === 'string') && !['', null, undefined].includes(key),
    )
    .map((dim) => ({
      id: dim,
      alias: dim,
      location: 'dimension',
    })) as Dimensions

  basicDimensions.push(MeaName)

  return basicDimensions
}
