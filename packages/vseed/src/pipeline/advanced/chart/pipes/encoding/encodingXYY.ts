import type { AdvancedPipe, Dimensions, FoldInfo, UnfoldInfo } from 'src/types'
import type { Encoding } from 'src/types'

export const encodingXYY: AdvancedPipe = (advancedVSeed) => {
  const result = { ...advancedVSeed }
  const { datasetReshapeInfo, dimensions } = advancedVSeed
  if (!datasetReshapeInfo || !dimensions) {
    return result
  }

  const xDimension =
    (dimensions as Dimensions).find(
      (item) => item.location !== 'rowDimension' && item.location !== 'columnDimension',
    ) || dimensions[0]

  const isZeroDimension = dimensions.length === 0

  const encoding = datasetReshapeInfo.reduce<Encoding>((prev, cur) => {
    const { foldInfoList, unfoldInfoList } = cur as {
      foldInfoList: FoldInfo[]
      unfoldInfoList: UnfoldInfo[]
    }

    const x = [isZeroDimension ? foldInfoList[0].measureName : xDimension?.id]
    const y = foldInfoList.map((d) => d.measureValue)
    const group = [unfoldInfoList[0].groupId]
    const color = [foldInfoList[0].measureName]

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
