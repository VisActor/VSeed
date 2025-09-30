import type { IArcLabelSpec, ILineChartSpec } from '@visactor/vchart'
import type { ILineLikeLabelSpec } from '@visactor/vchart/esm/series/mixin/interface'
import { createFormatter, createFormatterByMeasure, findMeasureById } from '../../../../utils'
import type {
  Datum,
  Dimensions,
  Encoding,
  FoldInfo,
  Formatter,
  Label,
  Measure,
  Measures,
  NumFormat,
  SpecPipe,
} from 'src/types'
import { merge, uniqueBy } from 'remeda'
import { MeasureName } from 'src/dataReshape'

export const label: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }
  const foldInfo = datasetReshapeInfo[0].foldInfo as FoldInfo

  const { label } = baseConfig

  result.label = buildLabel<ILineLikeLabelSpec>(
    label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.dimensions,
    advancedVSeed.measures,
    encoding as Encoding,
    [foldInfo],
  )

  return result
}

export const generateMeasureValue = (
  value: number | string,
  measure: Measure,
  labelAutoFormat?: boolean,
  numFormat: NumFormat = {},
) => {
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

export const buildLabel = <T extends ILineLikeLabelSpec | IArcLabelSpec>(
  label: Label,
  vseedMeasures: Measures = [],
  vseedDimensions: Dimensions = [],
  advancedVSeedDimensions: Dimensions,
  advancedVSeedMeasures: Measures,
  encoding: Encoding,
  foldInfoList: FoldInfo[],
): T => {
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
    autoFormat,
    numFormat = {},
  } = label

  const hasDimLabelEncoding = vseedDimensions.some((item) => encoding.label?.includes(item.id))

  const labelDims = uniqueBy(
    hasDimLabelEncoding
      ? vseedDimensions.filter((item) => encoding.label?.includes(item.id))
      : advancedVSeedDimensions.filter((d) => d.id !== MeasureName),
    (item) => item.id,
  )

  const labelMeas = uniqueBy(
    vseedMeasures.filter((item) => encoding.label?.includes(item.id)),
    (item) => item.id,
  )

  const percentFormat: NumFormat = merge(numFormat, {
    type: 'percent',
  } as NumFormat)

  const percentFormatter = createFormatter(percentFormat)

  const result = {
    visible: enable,
    formatMethod: (_, datum: Datum) => {
      const result = []

      const dimLabels = labelDims.map((item) => {
        const id = item.id
        return datum[id] as number | string
      })

      const meaLabels = labelMeas.map((item) =>
        generateMeasureValue(datum[item.id] as number | string, item, autoFormat, numFormat),
      )

      result.push(...dimLabels)

      foldInfoList.forEach((foldInfo) => {
        const { measureId, measureValue, statistics } = foldInfo
        const measure = findMeasureById(advancedVSeedMeasures, datum[measureId] as string)
        if (measure) {
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
          if (showValue) {
            result.push(measureValueLabel)
          }
          if (showValuePercent) {
            result.push(measurePercentLabel)
          }
        }
      })

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
  } as T

  if (labelOverlap) {
    result.overlap = {
      hideOnHit: true,
      clampForce: true,
    }
  }

  return result
}
