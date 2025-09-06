import type { AdvancedPipe, Dimensions, FoldInfo, UnfoldInfo } from 'src/types'
import type { Encodings } from 'src/types'

export const encodingAR: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions, measures } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions || !measures) {
    return result
  }

  const angleDimension =
    (dimensions as Dimensions).find(
      (item) => item.location !== 'rowDimension' && item.location !== 'columnDimension',
    ) || dimensions[0]

  const isZeroDimension = dimensions.length === 0

  const encoding = datasetReshapeInfo.reduce<Encodings>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur as {
      foldInfo: FoldInfo
      unfoldInfo: UnfoldInfo
    }

    const angle = [isZeroDimension ? foldInfo.measureName : angleDimension?.id]
    const radius = [foldInfo.measureValue]
    const group = [unfoldInfo.groupId]
    const color = [unfoldInfo.groupId]

    return [
      ...prev,
      {
        angle,
        radius,
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
