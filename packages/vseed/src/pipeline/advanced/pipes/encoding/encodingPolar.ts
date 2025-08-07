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
    const angle = [unfoldInfo.groupName]
    const group = [unfoldInfo.groupName]
    const color = [unfoldInfo.groupName]

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
