import type { IHistogramChartSpec } from '@visactor/vchart'
import type { Encoding, FoldInfo, Label, SpecPipe } from 'src/types'
import { buildLabel } from './label'

export const labelHistogram: SpecPipe = (spec, context) => {
  const result = { ...spec } as IHistogramChartSpec
  const { advancedVSeed, vseed } = context
  const { measures = [] } = vseed
  const { datasetReshapeInfo } = advancedVSeed
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }
  const foldInfo = datasetReshapeInfo[0].foldInfo as FoldInfo

  const { label } = baseConfig

  result.label = buildLabel(
    label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.dimensions,
    advancedVSeed.measures,
    {
      ...encoding,
      label: encoding.label?.length ? encoding.label : measures.map((v) => v.id),
    } as Encoding,
    [foldInfo],
  ) as unknown as IHistogramChartSpec['label']
  return result
}
