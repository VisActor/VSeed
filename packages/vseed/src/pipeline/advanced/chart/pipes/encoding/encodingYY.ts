import { findFirstMeasure } from 'src/pipeline/utils'
import type { AdvancedPipe, FoldInfo, UnfoldInfo } from 'src/types'
import type { Encodings } from 'src/types'

export const encodingYY: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, measures } = advancedVSeed
  if (!datasetReshapeInfo || !measures) {
    return result
  }

  const firstMeasure = findFirstMeasure(measures)
  const encoding = datasetReshapeInfo.reduce<Encodings>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur as {
      foldInfo: FoldInfo
      unfoldInfo: UnfoldInfo
    }

    const x = [firstMeasure?.id]
    const y = [foldInfo.measureValue]
    const group = [unfoldInfo.groupId]
    const color = [unfoldInfo.groupId]

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
