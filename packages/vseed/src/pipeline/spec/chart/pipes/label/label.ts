import type { ILineChartSpec } from '@visactor/vchart'
import type { ILineLikeLabelSpec } from '@visactor/vchart/esm/series/mixin/interface'
import { autoFormatter, createFormatter, findMeasureById } from '../../../../utils'
import type { Datum, Label, SpecPipe } from 'src/types'
import { isEmpty } from 'remeda'

export const label: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed } = context
  const { measures, datasetReshapeInfo, locale } = advancedVSeed
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }

  if (!baseConfig || !baseConfig.label) {
    return result
  }

  const { measureId, measureValue } = datasetReshapeInfo[0].foldInfo
  const { label } = baseConfig
  const { enable } = label

  result.label = {
    visible: enable,
    formatMethod: (value: string, datum: Datum) => {
      const result = []

      const formatValue = (value: number) => {
        const id = datum[measureId] as string
        const measure = findMeasureById(measures, id)
        if (!measure) {
          return value
        }

        const { format = {}, autoFormat = true } = measure

        if (!isEmpty(format)) {
          const formatter = createFormatter(format)
          return formatter(value)
        }
        if (autoFormat) {
          return autoFormatter(value, locale)
        }
        return String(value)
      }

      result.push(formatValue(datum[measureValue] as number))

      return result.join(' ')
    },
  } as ILineLikeLabelSpec
  return result
}
