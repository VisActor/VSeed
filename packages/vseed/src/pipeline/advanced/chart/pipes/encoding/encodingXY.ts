import type { AdvancedPipe, Dimensions, FoldInfo, UnfoldInfo } from 'src/types'
import type { Encodings } from 'src/types'

export const encodingXY: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions) {
    return result
  }

  const xDimension =
    (dimensions as Dimensions).find(
      (item) => item.location !== 'rowDimension' && item.location !== 'columnDimension',
    ) || dimensions[0]

  const isZeroDimension = dimensions.length === 0

  const encoding = datasetReshapeInfo.reduce<Encodings>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur as {
      foldInfo: FoldInfo
      unfoldInfo: UnfoldInfo
    }

    const x = [isZeroDimension ? foldInfo.measureName : xDimension?.id]
    const y = [foldInfo.measureValue]
    const group = [unfoldInfo.groupId]
    const color = [foldInfo.measureName]

    return [
      ...prev,
      {
        x,
        y,
        group,
        color,
      },
    ] as Encodings
  }, [])

  return {
    ...result,
    encoding,
  }
}
