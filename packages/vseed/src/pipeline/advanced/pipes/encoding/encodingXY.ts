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

    const isSingleDimension = dimensions.length === 0
    const x = [isSingleDimension ? foldInfo.measureName : dimensions[0].id]
    const y = [foldInfo.measureValue]
    const group = [isSingleDimension ? foldInfo.measureName : unfoldInfo.groupName]
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
