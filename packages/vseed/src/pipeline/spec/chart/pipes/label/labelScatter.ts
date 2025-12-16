import type { IScatterChartSpec } from '@visactor/vchart'
import type { Encoding, FoldInfo, Label, VChartSpecPipe } from 'src/types'
import { buildLabel } from './label'

export const labelScatter: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IScatterChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }

  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]

  const { label } = baseConfig

  result.label = buildLabel(
    label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.dimensions!,
    advancedVSeed.measures!,
    encoding as Encoding,
    foldInfoList,
  ) as unknown as IScatterChartSpec['label']

  return result
}
