import type { AdvancedPipe } from 'src/types'
import type { Encoding } from 'src/types'

export const encodingXY: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions) {
    return result
  }

  const { foldInfo, unfoldInfo } = datasetReshapeInfo

  const isSingleDimension = dimensions.length === 0

  const x = [isSingleDimension ? foldInfo.measureName : dimensions[0].id]
  const y = [foldInfo.measureValue]
  const group = [isSingleDimension ? foldInfo.measureName : unfoldInfo.groupName]
  const color = [foldInfo.measureName]
  const encoding = [
    {
      x,
      y,
      group,
      color,
    },
  ] as Encoding

  return {
    ...result,
    encoding,
  }
}

export const encodingYX: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions) {
    return result
  }

  const { foldInfo, unfoldInfo } = datasetReshapeInfo

  const isSingleDimension = dimensions.length === 0

  const y = [isSingleDimension ? foldInfo.measureName : dimensions[0].id]
  const x = [foldInfo.measureValue]
  const group = [isSingleDimension ? foldInfo.measureName : unfoldInfo.groupName]
  const color = [foldInfo.measureName]
  const encoding = [
    {
      x,
      y,
      group,
      color,
    },
  ] as Encoding

  return {
    ...result,
    encoding,
  }
}
