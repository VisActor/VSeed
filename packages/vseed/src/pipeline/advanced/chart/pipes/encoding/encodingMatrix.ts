import type { AdvancedPipe, Dimensions, FoldInfo, UnfoldInfo } from 'src/types'
import type { Encoding } from 'src/types'

export const encodingMatrix: AdvancedPipe = (advancedVSeed) => {
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

  const encoding = datasetReshapeInfo.reduce<Encoding>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur as {
      foldInfo: FoldInfo
      unfoldInfo: UnfoldInfo
    }

    const x = [isZeroDimension ? foldInfo.measureName : xDimension?.id]
    const y = [unfoldInfo.groupName]
    const color = [foldInfo.measureValue]

    return [
      ...prev,
      {
        x,
        y,
        color,
      },
    ] as Encoding
  }, [])

  return {
    ...result,
    encoding,
  }
}
