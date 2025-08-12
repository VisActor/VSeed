import type { ILineChartSpec } from '@visactor/vchart'
import type { ILineLikeLabelSpec } from '@visactor/vchart/esm/series/mixin/interface'
import { createFormatter, findMeasureById } from '../../../utils'
import type { Datum, Label, SpecPipe } from 'src/types'

export const label: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed } = context
  const { measures, datasetReshapeInfo } = advancedVSeed
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

      if (format || autoFormat) {
        const formatter = createFormatter(format)
        return formatter(value)
      }
    },
  } as ILineLikeLabelSpec
  return result
}
