import type { AdvancedPipe, FoldInfo, UnfoldInfo } from 'src/types'
import type { Encodings } from 'src/types'

export const encodingPie: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo } = advancedVSeed
  if (!datasetReshapeInfo) {
    return result
  }

  const encoding = datasetReshapeInfo.reduce<Encodings>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur as {
      foldInfo: FoldInfo
      unfoldInfo: UnfoldInfo
    }

    const radius = [foldInfo.measureValue]
    const angle = [unfoldInfo.groupId]
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
