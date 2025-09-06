import type { AdvancedPipe, FoldInfo, UnfoldInfo } from 'src/types'
import type { Encodings } from 'src/types'

export const encodingXY: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions) {
    return result
  }

  const encodings = datasetReshapeInfo.reduce<Encodings>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur as {
      foldInfo: FoldInfo
      unfoldInfo: UnfoldInfo
    }

    // measures encoding
    const y = [foldInfo.measureValue]
    // dimensions encoding
    const x = [unfoldInfo.encodingX]
    const color = [unfoldInfo.encodingColor]
    const detail = [unfoldInfo.encodingDetail]

    return [
      ...prev,
      {
        x,
        y,
        color,
        detail,
      },
    ] as Encodings
  }, [])

  return {
    ...result,
    encodings,
  }
}
