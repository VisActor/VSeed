import type { AdvancedPipe, Dimensions } from 'src/types'
import type { Encoding } from 'src/types'

export const encodingMatrix: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions) {
    return result
  }

  const xDimension = (dimensions as Dimensions).find(
    (item) => item.location !== 'rowDimension' && item.location !== 'columnDimension',
  )

  const isZeroDimension = dimensions.length === 0

  const encoding = datasetReshapeInfo.reduce<Encoding>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur

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
