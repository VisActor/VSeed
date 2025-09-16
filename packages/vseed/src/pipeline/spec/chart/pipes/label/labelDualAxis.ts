import type { ILineChartSpec } from '@visactor/vchart'
import type { Encoding, FoldInfo, Label, SpecPipe } from 'src/types'
import { isNullish } from 'remeda'
import { buildLabel } from './label'

export const labelPrimary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, encoding } = advancedVSeed
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }

  if (!baseConfig || !baseConfig.label) {
    return result
  }

  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]
  result.label = buildLabel(
    baseConfig.label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.measures,
    encoding as Encoding,
    foldInfoList[0],
  )

  return result
}

export const labelSecondary: SpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { datasetReshapeInfo, encoding } = advancedVSeed
  const { chartType } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { label: Label }

  if (!baseConfig || !baseConfig.label) {
    return result
  }
  if (isNullish(datasetReshapeInfo[0].foldInfoList?.[1])) {
    return result
  }
  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]

  result.label = buildLabel(
    baseConfig.label,
    vseed.measures,
    vseed.dimensions,
    advancedVSeed.measures,
    encoding as Encoding,
    foldInfoList[1],
  )

  return result
}
