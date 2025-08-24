import type { AdvancedPipe, FoldInfo, UnfoldInfo } from 'src/types'
import type { Encoding } from 'src/types'

export const encodingAreaRange: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, measures } = advancedVSeed
  if (!datasetReshapeInfo || !measures) {
    return result
  }

  const encoding = datasetReshapeInfo.reduce<Encoding>((prev, cur, index) => {
    const measure = measures[index]
    if ('children' in measure) {
      const m1 = measure.children?.[0]
      const m2 = measure.children?.[1] || m1
      const { foldInfo, unfoldInfo } = cur as {
        foldInfo: FoldInfo
        unfoldInfo: UnfoldInfo
      }

      const x = [unfoldInfo.groupId]
      const y = [m1?.id, m2?.id]
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
    } else {
      const m1 = measures[index]
      const m2 = measures[index + 1] || m1
      const { foldInfo, unfoldInfo } = cur as {
        foldInfo: FoldInfo
        unfoldInfo: UnfoldInfo
      }

      const x = [unfoldInfo.groupId]
      const y = [m1.id, m2.id]
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
    }
  }, [])

  return {
    ...result,
    encoding,
  }
}
