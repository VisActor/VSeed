import type { AdvancedPipe, Dimensions } from 'src/types'
import type { Encoding } from 'src/types'

export const encodingYX: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions) {
    return result
  }

  const yDimension =
    (dimensions as Dimensions).find(
      (item) => item.location !== 'rowDimension' && item.location !== 'columnDimension',
    ) || dimensions[0]

  const isZeroDimension = dimensions.length === 0

  const encoding = datasetReshapeInfo.reduce<Encoding>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur

    const y = [isZeroDimension ? foldInfo.measureName : yDimension?.id]
    const x = [foldInfo.measureValue]
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
    ] as Encoding
  }, [])

  return {
    ...result,
    encoding,
  }
}
