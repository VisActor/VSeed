import type { AdvancedPipe, Dimensions } from 'src/types'
import type { Encoding } from 'src/types'

export const encodingRose: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions, measures } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions || !measures) {
    return result
  }

  const angleDimension = (dimensions as Dimensions).find(
    (item) => item.location !== 'rowDimension' && item.location !== 'columnDimension',
  )

  const is1D1M = dimensions.length === 1 && measures.length === 1
  const isZeroDimension = dimensions.length === 0

  const encoding = datasetReshapeInfo.reduce<Encoding>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur

    const radius = [foldInfo.measureValue]
    const angle = [isZeroDimension ? foldInfo.measureName : angleDimension?.id]
    const group = [is1D1M ? angleDimension?.id : unfoldInfo.groupId]
    const color = [is1D1M ? angleDimension?.id : unfoldInfo.groupId]

    return [
      ...prev,
      {
        angle,
        radius,
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
