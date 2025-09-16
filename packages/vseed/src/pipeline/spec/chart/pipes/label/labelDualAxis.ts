import type { ILineChartSpec } from '@visactor/vchart'
import type { ILineLikeLabelSpec } from '@visactor/vchart/esm/series/mixin/interface'
import { createFormatter, findMeasureById } from '../../../../utils'
import type { Datum, FoldInfo, Label, NumFormat, SpecPipe } from 'src/types'
import { isNullish, merge, uniqueBy } from 'remeda'
import { generateMeasurePercent, generateMeasureValue } from './label'

export const labelPrimary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { measures, datasetReshapeInfo, encoding } = advancedVSeed
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }

  if (!baseConfig || !baseConfig.label) {
    return result
  }

  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]
  const { measureId, measureValue, statistics } = foldInfoList[0]
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

export const labelSecondary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { measures, datasetReshapeInfo, encoding } = advancedVSeed
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }

  if (!baseConfig || !baseConfig.label) {
    return result
  }
  if (isNullish(datasetReshapeInfo[0].foldInfoList?.[1])) {
    return result
  }
  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]

  const { measureId, measureValue, statistics } = foldInfoList[1]
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
