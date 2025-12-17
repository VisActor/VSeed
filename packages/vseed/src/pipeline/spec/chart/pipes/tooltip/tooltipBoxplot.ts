import { pipe, uniqueBy, isNullish } from 'remeda'
import { createFormatterByMeasure, findMeasureById } from '../../../../utils'
import type {
  Dimension,
  Dimensions,
  Encoding,
  VChartSpecPipe,
  Tooltip,
  Measures,
  FoldInfo,
  UnfoldInfo,
} from 'src/types'
import type { Datum, ISpec, ITooltipLinePattern, ITooltipLineActual, TooltipData } from '@visactor/vchart'
import {
  ColorEncoding,
  LowerWhisker,
  MeasureId,
  MeasureName,
  MedianMeasureId,
  OutliersMeasureId,
  Q1MeasureValue,
  Q3MeasureValue,
  UpperWhisker,
  XEncoding,
} from 'src/dataReshape'
import { getTooltipStyle } from './tooltipStyle'
import { intl } from 'src/i18n'
import { updateTooltipElement } from './tooltipElement'

const boxPlotMeasureKeys = [UpperWhisker, Q3MeasureValue, MedianMeasureId, Q1MeasureValue, LowerWhisker]
const VCHART_OUTLIER_KEY = '__VCHART_BOX_PLOT_OUTLIER_VALUE'

export const tooltipBoxplot: VChartSpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed, vseed } = context
  const { chartType, dimensions = [], encoding, datasetReshapeInfo } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType as 'boxPlot'] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig
  const { enable } = tooltip
  const meas = (vseed.measures ?? []) as Measures
  const valueMeasure = meas.find((item) => item.encoding === 'value' || isNullish(item.encoding))
  const defaultFormatter = valueMeasure ? createFormatterByMeasure(valueMeasure) : (v: unknown) => v
  const measureAliasMapping: Record<string, string> = {
    [OutliersMeasureId]: intl.i18n`异常点`,
    [UpperWhisker]: intl.i18n`上边界`,
    [Q3MeasureValue]: intl.i18n`上四分位数`,
    [MedianMeasureId]: intl.i18n`中位数`,
    [Q1MeasureValue]: intl.i18n`下四分位数`,
    [LowerWhisker]: intl.i18n`下边界`,
  }
  const { unfoldInfo } = datasetReshapeInfo[0] as unknown as {
    foldInfo: FoldInfo
    unfoldInfo: UnfoldInfo
  }

  result.tooltip = {
    visible: enable,
    style: getTooltipStyle(tooltip),
    mark: {
      title: {
        visible: false,
      },
      content: createMarkContent(encoding.tooltip || [], dimensions, encoding as Encoding),
      updateContent: (prev: ITooltipLineActual[] | undefined, data: TooltipData | undefined) => {
        const datum = (data as any)?.[0]?.datum?.[0]

        if (!isNullish(datum?.[VCHART_OUTLIER_KEY])) {
          const tooltipItems: ITooltipLineActual[] = (prev ?? []).filter(
            (item: any) => !boxPlotMeasureKeys.includes(item.key as string),
          )
          const outerlierMeasure = meas.find((item) => item.id === OutliersMeasureId)
          const formatter = outerlierMeasure ? createFormatterByMeasure(outerlierMeasure) : defaultFormatter

          tooltipItems.push({
            ...(tooltipItems[0] as any),
            key: outerlierMeasure?.alias ?? measureAliasMapping[OutliersMeasureId],
            value: formatter(datum?.[VCHART_OUTLIER_KEY] as number) as string,
          } as ITooltipLineActual)

          return tooltipItems
        }

        return (prev ?? []).map((entry) => {
          if (boxPlotMeasureKeys.includes((entry as any).key as string)) {
            const mea = meas.find((item) => item.id === (entry as any).key)
            const formatter = mea ? createFormatterByMeasure(mea) : defaultFormatter

            return {
              ...(entry as any),
              value: formatter(datum?.[(entry as any).key] as number) as string,
              key: mea?.alias ?? measureAliasMapping[entry?.key as string] ?? (entry as any).key,
            }
          }

          return entry
        }) as ITooltipLineActual[]
      },
    },
    dimension: {
      title: {
        visible: true,
      },
      content: createDimensionContent(dimensions, meas, unfoldInfo, measureAliasMapping[MedianMeasureId]),
    },
    updateElement: updateTooltipElement,
  }
  return result as unknown as ISpec
}

const createMarkContent = (tooltip: string[], dimensions: Dimensions, encoding: Encoding) => {
  const dims = pipe(
    dimensions.filter((item) => tooltip.includes(item.id)),
    uniqueBy((item: Dimension) => item.id),
    uniqueBy((item: Dimension) => item.alias),
  )

  const dimContent = dims.map((item: Dimension) => ({
    visible: true,
    hasShape: true,
    shapeType: 'rectRound',
    key: item.alias ?? item.id,
    value: (datum: Datum | undefined) => {
      if (!isNullish(datum?.[VCHART_OUTLIER_KEY])) {
        if (encoding.color?.includes(item.id)) {
          return datum?.[ColorEncoding] as string
        }
        if (encoding.x?.includes(item.id)) {
          return datum?.[XEncoding] as string
        }
      }

      return datum?.[item.id] as string
    },
  }))

  const defaultContent = boxPlotMeasureKeys.map((key: string) => {
    return {
      visible: true,
      hasShape: true,
      shapeType: 'rectRound',
      key,
      value: (datum: Datum | undefined) => {
        if (!datum) {
          return ''
        }
        return datum[key] as string | number
      },
    }
  })

  return [...dimContent, defaultContent] as ITooltipLinePattern[]
}

const createDimensionContent = (
  dimensions: Dimensions,
  measures: Measures,
  unfoldInfo: UnfoldInfo,
  medianAlias: string,
) => {
  const { encodingColor } = unfoldInfo

  return [
    {
      visible: true,
      shapeType: 'rectRound',
      hasShape: true,
      key: dimensions.some((d) => d.encoding === 'color')
        ? (v: unknown) => {
            const datum = v as Datum
            const key = (datum && (datum[encodingColor] as string)) || ''
            return `${unfoldInfo.colorIdMap[key].alias ?? key}(${medianAlias})`
          }
        : (v: unknown) => {
            const datum = v as Datum
            return `${datum[MeasureName] ?? datum[MeasureId]}(${medianAlias})`
          },
      value: (v: unknown) => {
        const datum = v as Datum
        if (!datum) {
          return ''
        }
        const value = datum[MedianMeasureId] as string | number // dimension tooltip 中默认显示中位数
        const id = datum[MeasureId] as string
        const measure = findMeasureById(measures, id)
        const formatter = createFormatterByMeasure(measure)
        return formatter(value)
      },
    },
  ]
}
