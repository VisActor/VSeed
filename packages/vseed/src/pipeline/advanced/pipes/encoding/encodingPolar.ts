import type { AdvancedPipe } from 'src/types'
import type { Encoding } from 'src/types'

export const encodingPolar: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions) {
    return result
  }

  const encoding = datasetReshapeInfo.reduce<Encoding>((prev, cur) => {
    const { foldInfo, unfoldInfo } = cur

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
    ] as Encoding
  }, [])

  return {
    ...result,
    encoding,
  }
}
