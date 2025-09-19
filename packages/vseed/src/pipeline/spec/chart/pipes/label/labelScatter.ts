import type { IScatterChartSpec } from '@visactor/vchart'
import type { Encoding, FoldInfo, Label, SpecPipe } from 'src/types'
import { buildLabel } from './label'
import type { ILineLikeLabelSpec } from '@visactor/vchart/esm/series/mixin/interface'

export const labelScatter: SpecPipe = (spec, context) => {
  const result = { ...spec } as IScatterChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { chartType, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }

  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]

  const { label } = baseConfig

  result.label = buildLabel<ILineLikeLabelSpec>(
    label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.measures,
    encoding as Encoding,
    foldInfoList,
  )

  return result
}
