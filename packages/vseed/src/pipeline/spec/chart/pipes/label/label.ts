import type { ILineChartSpec } from '@visactor/vchart'
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
import { isEmpty, merge, uniqueBy } from 'remeda'
import { DUAL_AXIS_LABEL_Z_INDEX } from 'src/pipeline/utils/constant'

export const label: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }
  const foldInfo = datasetReshapeInfo[0].foldInfo as FoldInfo
  if (!baseConfig || isEmpty(baseConfig.label)) {
    return result
  }

  const { label } = baseConfig

  result.label = buildLabel(label, vseed.measures, vseed.dimensions, advancedVSeed.measures, encoding as Encoding, [
    foldInfo,
  ])

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

export const buildLabel = (
  label: Label,
  vseedMeasures: Measures = [],
  vseedDimensions: Dimensions = [],
  advancedVSeedMeasures: Measures,
  encoding: Encoding,
  foldInfoList: FoldInfo[],
) => {
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
    (vseedDimensions || []).filter((item) => encoding.label?.includes(item.id)),
    (item) => item.id,
  )
  const labelMeas = uniqueBy(
    (vseedMeasures || []).filter((item) => encoding.label?.includes(item.id)),
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

      const dimLabels = labelDims.map((item) => item.alias || item.id)
      const meaLabels = labelMeas.map((item) =>
        generateMeasureValue(datum[item.id] as number | string, item, autoFormat, numFormat),
      )

      result.push(...dimLabels)

      foldInfoList.forEach((foldInfo) => {
        const { measureId, measureValue, statistics } = foldInfo
        const measure = findMeasureById(advancedVSeedMeasures, datum[measureId] as string)
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
  } as ILineLikeLabelSpec

  if (labelOverlap) {
    result.overlap = {
      hideOnHit: true,
      clampForce: true,
    }
  }

  return result
}
