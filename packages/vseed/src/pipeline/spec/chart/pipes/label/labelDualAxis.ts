import type { ILineChartSpec } from '@visactor/vchart'
import type { Encoding, FoldInfo, Label, SpecPipe } from 'src/types'
import { buildLabel } from './label'
import { DUAL_AXIS_LABEL_Z_INDEX } from 'src/pipeline/utils/constant'
import type { ILineLikeLabelSpec } from '@visactor/vchart/esm/series/mixin/interface'

export const labelPrimary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, encoding } = advancedVSeed
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }

  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]
  result.label = buildLabel<ILineLikeLabelSpec>(
    baseConfig.label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.measures,
    encoding as Encoding,
    [foldInfoList[0]],
  )
  result.label.zIndex = DUAL_AXIS_LABEL_Z_INDEX
  return result
}

export const labelSecondary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, encoding } = advancedVSeed
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }

  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]

  result.label = buildLabel<ILineLikeLabelSpec>(
    baseConfig.label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.measures,
    encoding as Encoding,
    [foldInfoList[1]],
  )
  result.label.zIndex = DUAL_AXIS_LABEL_Z_INDEX
  return result
}
