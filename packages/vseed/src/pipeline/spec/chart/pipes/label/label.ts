import type { ILineChartSpec } from '@visactor/vchart'
import type { ILineLikeLabelSpec } from '@visactor/vchart/esm/series/mixin/interface'
import { createFormatter, createFormatterByMeasure, findMeasureById } from '../../../../utils'
import type { Datum, Formatter, Label, Measure, NumFormat, SpecPipe } from 'src/types'
import { isEmpty, merge, uniqueBy } from 'remeda'

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
  const {
    enable,
    wrap,
    showValue,
    showValuePercent,
    labelOverlap,
    labelColorSmartInvert,
    labelColor,
    labelFontSize,
    labelFontWeight,
    labelBackgroundColor,
    labelPosition,
    autoFormat = true,
    numFormat = {},
  } = label

  const labelDims = uniqueBy(
    (vseed.dimensions || []).filter((item) => encoding.label?.includes(item.id)),
    (item) => item.id,
  )
  const labelMeas = uniqueBy(
    (vseed.measures || []).filter((item) => encoding.label?.includes(item.id)),
    (item) => item.id,
  )

  const percentFormat: NumFormat = merge(numFormat, {
    type: 'percent',
  } as NumFormat)

  const percentFormatter = createFormatter(percentFormat)

  result.label = {
    visible: enable,
    formatMethod: (_, datum: Datum) => {
      const result = []

      const dimLabels = labelDims.map((item) => item.alias || item.id)
      const meaLabels = labelMeas.map((item) =>
        generateMeasureValue(datum[item.id] as number | string, item, autoFormat, numFormat),
      )

      const measure = findMeasureById(measures, datum[measureId] as string)
      const measureValueLabel = generateMeasureValue(
        datum[measureValue] as number | string,
        measure,
        autoFormat,
        numFormat,
      )
      const measurePercentLabel = generateMeasurePercent(
        datum[measureValue] as number | string,
        statistics.sum,
        percentFormatter,
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
    position: labelPosition,
    style: {
      fill: labelColor,
      fontSize: labelFontSize,
      fontWeight: labelFontWeight,
      background: labelBackgroundColor,
    },
    smartInvert: labelColorSmartInvert,
  } as ILineLikeLabelSpec

  if (labelOverlap) {
    result.label.overlap = {
      hideOnHit: true,
      clampForce: true,
    }
  }

  return result
}

export const generateMeasureValue = (
  value: number | string,
  measure?: Measure,
  labelAutoFormat: boolean = true,
  numFormat: NumFormat = {},
) => {
  if (!measure) {
    return value
  }

  const format = merge(numFormat, measure.numFormat || measure.format)
  const mergedMeasure = { ...measure, numFormat: format, autoFormat: labelAutoFormat || measure.autoFormat }

  const formatter = createFormatterByMeasure(mergedMeasure)
  return formatter(value)
}

export const generateMeasurePercent = (value: number | string, sum: number, formatter: Formatter) => {
  if (value === undefined || value === null) return String(value)
  const num = Number(value)
  if (Number.isNaN(num)) return String(value)

  const percentValue = num / sum
  return formatter(percentValue)
}
