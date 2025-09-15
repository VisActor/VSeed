import type { ILineChartSpec } from '@visactor/vchart'
import type { ILineLikeLabelSpec } from '@visactor/vchart/esm/series/mixin/interface'
import { autoFormatter, createFormatter, findMeasureById } from '../../../../utils'
import type { Datum, Formatter, Label, Measure, NumFormat, SpecPipe } from 'src/types'
import { isEmpty, uniqueBy } from 'remeda'
import { intl } from 'src/i18n'

export const label: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { measures, datasetReshapeInfo } = advancedVSeed
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }

  if (!baseConfig || isEmpty(baseConfig.label)) {
    return result
  }

  const { measureId, measureValue, statistics } = datasetReshapeInfo[0].foldInfo
  const { label } = baseConfig
  const { enable, wrap, showValue, showValuePercent } = label

  const labelDims = uniqueBy(
    (vseed.dimensions || []).filter((item) => encoding.label?.includes(item.id)),
    (item) => item.id,
  )
  const labelMeas = uniqueBy(
    (vseed.measures || []).filter((item) => encoding.label?.includes(item.id)),
    (item) => item.id,
  )

  const format: NumFormat = {
    type: 'percent',
  }
  const formatter = createFormatter(format)

  result.label = {
    visible: enable,
    formatMethod: (_, datum: Datum) => {
      const result = []

      const measure = findMeasureById(measures, datum[measureId] as string)
      const dimLabels = labelDims.map((item) => item.alias || item.id)
      const meaLabels = labelMeas.map((item) => generateMeasureValue(datum[item.id] as number | string, item))
      const measureValueLabel = generateMeasureValue(datum[measureValue] as number | string, measure)
      const measurePercentLabel = generateMeasurePercent(
        datum[measureValue] as number | string,
        statistics.sum,
        formatter,
      )

      result.push(...dimLabels)

      if (showValue) {
        result.push(measureValueLabel)
      }
      if (showValuePercent) {
        result.push(measurePercentLabel)
      }

      result.push(...meaLabels)

      if (wrap) {
        return result
      }
      return result.join(' ')
    },
  } as ILineLikeLabelSpec
  return result
}

const generateMeasureValue = (value: number | string, measure?: Measure) => {
  if (!measure) {
    return value
  }
  const { format = {}, autoFormat = true } = measure

  if (!isEmpty(format)) {
    const formatter = createFormatter(format)
    return formatter(value)
  }
  if (autoFormat) {
    return autoFormatter(value, intl.getLocale())
  }
  return String(value)
}

const generateMeasurePercent = (value: number | string, sum: number, formatter: Formatter) => {
  if (value === undefined || value === null) return String(value)
  const num = Number(value)
  if (Number.isNaN(num)) return String(value)

  const percentValue = num / sum
  return formatter(percentValue)
}
