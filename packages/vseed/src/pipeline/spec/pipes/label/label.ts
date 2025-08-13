import type { ILineChartSpec } from '@visactor/vchart'
import type { ILineLikeLabelSpec } from '@visactor/vchart/esm/series/mixin/interface'
import { autoFormatter, createFormatter, findMeasureById } from '../../../utils'
import type { Datum, Label, SpecPipe } from 'src/types'
import { isEmpty } from 'remeda'

export const label: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed } = context
  const { measures, datasetReshapeInfo, locale } = advancedVSeed
  const baseConfig = advancedVSeed.baseConfig.vchart

  if (!baseConfig || !baseConfig.label) {
    return result
  }

  const { measureId } = datasetReshapeInfo[0].foldInfo
  const { label } = baseConfig
  const { enable } = label as Label

  result.label = {
    visible: enable,
    formatMethod: (value: string, datum: Datum) => {
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
    },
  } as ILineLikeLabelSpec
  return result
}
