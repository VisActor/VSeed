import { findFirstMeasure } from 'src/pipeline/utils'
import type { AdvancedPipe } from 'src/types'
import type { Encoding } from 'src/types'

export const encodingYY: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, measures } = advancedVSeed
  if (!datasetReshapeInfo || !measures) {
    return result
  }

  const firstMeasure = findFirstMeasure(measures)
  const encoding = datasetReshapeInfo.reduce<Encoding>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur

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
    ] as Encoding
  }, [])

  return {
    ...result,
    encoding,
  }
}
