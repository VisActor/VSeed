import { isNullish } from 'remeda'
import { createDimensionContent, createMarkContent } from './tooltip'
import type { FoldInfo, SpecPipe, Tooltip, UnfoldInfo } from 'src/types'
import { findAllMeasures } from 'src/pipeline/utils'

export const tooltipPrimary: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed, vseed } = context
  const { measures, datasetReshapeInfo, chartType, dimensions, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig
  const { enable } = tooltip

  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]
  const unfoldInfo = datasetReshapeInfo[0].unfoldInfo

  result.tooltip = {
    visible: enable,
    mark: {
      title: {
        visible: false,
      },
      content: createMarkContent(
        encoding.tooltip || [],
        dimensions,
        findAllMeasures(vseed.measures),
        foldInfoList[0],
        unfoldInfo,
      ),
    },
    dimension: {
      title: {
        visible: true,
      },
      content: createDimensionContent(measures, foldInfoList[0], unfoldInfo),
    },
  }
  return result
}

export const tooltipSecondary: SpecPipe = (spec, context) => {
  const result = { ...spec }
  const { advancedVSeed, vseed } = context
  const { measures, datasetReshapeInfo, chartType, dimensions, encoding } = advancedVSeed
  const baseConfig = advancedVSeed.config[chartType] as { tooltip: Tooltip }
  const { tooltip = { enable: true } } = baseConfig
  const { enable } = tooltip

  if (isNullish(datasetReshapeInfo[0].foldInfoList?.[1])) {
    return result
  }

  const foldInfoList = datasetReshapeInfo[0].foldInfoList as FoldInfo[]
  const unfoldInfo = datasetReshapeInfo[0].unfoldInfo as UnfoldInfo
  result.tooltip = {
    visible: enable,
    mark: {
      title: {
        visible: false,
      },
      content: createMarkContent(
        encoding.tooltip || [],
        dimensions,
        findAllMeasures(vseed.measures),
        foldInfoList[1],
        unfoldInfo,
      ),
    },
    dimension: {
      title: {
        visible: true,
      },
      content: createDimensionContent(measures, foldInfoList[1], unfoldInfo),
    },
  }
  return result
}
