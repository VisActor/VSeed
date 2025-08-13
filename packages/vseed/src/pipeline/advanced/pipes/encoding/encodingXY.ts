import type { AdvancedPipe } from 'src/types'
import type { Encoding } from 'src/types'

export const encodingXY: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions) {
    return result
  }

  const encoding = datasetReshapeInfo.reduce<Encoding>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur

    const isZeroDimension = dimensions.length === 0
    const x = [isZeroDimension ? foldInfo.measureName : dimensions[0].id]
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
    ] as Encoding
  }, [])

  return {
    ...result,
    encoding,
  }
}
