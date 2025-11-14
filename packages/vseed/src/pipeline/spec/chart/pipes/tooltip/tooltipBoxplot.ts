import { pipe, uniqueBy, isNullish } from 'remeda'
import { createFormatterByMeasure, findAllMeasures } from '../../../../utils'
import type { Dimension, Dimensions, Encoding, Spec, SpecPipe, Tooltip } from 'src/types'
import type { Datum, ISpec, ITooltipLinePattern, ITooltipLineActual, TooltipData } from '@visactor/vchart'
import {
  ColorEncoding,
  MaxMeasureId,
  MedianMeasureId,
  MinMeasureId,
  OutliersMeasureId,
  Q1MeasureValue,
  Q3MeasureValue,
  XEncoding,
} from 'src/dataReshape'
import { getTooltipStyle } from './tooltipStyle'

const boxPlotMeasureKeys = [MaxMeasureId, Q3MeasureValue, MedianMeasureId, Q1MeasureValue, MinMeasureId]
const VCHART_OUTLIER_KEY = '__VCHART_BOX_PLOT_OUTLIER_VALUE'

export const tooltipBoxplot: SpecPipe<Spec> = (spec, context): Partial<Spec> => {
  const result = { ...spec }
  const { advancedVSeed, vseed } = context
  const { chartType, dimensions, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig
  const { enable } = tooltip
  const meas = findAllMeasures(vseed.measures)
  const valueMeasure = meas.find((item) => item.encoding === 'value' || isNullish(item.encoding))
  const defaultFormatter = valueMeasure ? createFormatterByMeasure(valueMeasure) : (v: unknown) => v

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
            key: outerlierMeasure?.alias ?? OutliersMeasureId,
            value: formatter(datum?.[VCHART_OUTLIER_KEY] as number) as string,
          } as ITooltipLineActual)

          return tooltipItems
        }

        return (prev ?? []).map((entry) => {
          if (boxPlotMeasureKeys.includes((entry as any).key as string)) {
            const mea = meas.find((item) => item.id === (entry as any).key)
            const formatter = mea ? createFormatterByMeasure(mea) : defaultFormatter

            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
              ...(entry as any),
              value: formatter(datum?.[(entry as any).key] as number) as string,
              key: mea?.alias ?? (entry as any).key,
            }
          }

          return entry
        }) as ITooltipLineActual[]
      },
    },
    dimension: {
      visible: false,
    },
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
