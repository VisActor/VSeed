import type { AdvancedPipe, Dataset, DatasetReshapeInfo, Line } from 'src/types'
import { calcOrder } from './common'

export const sortYBandAxis: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { sort: sortAxis } = vseed as Line
  const { datasetReshapeInfo, dataset } = advancedVSeed as { datasetReshapeInfo: DatasetReshapeInfo; dataset: Dataset }
  const { unfoldInfo } = datasetReshapeInfo[0]
  const yField = unfoldInfo?.encodingY
  if (!sortAxis || !yField) {
    return advancedVSeed
  }
  if (!result.analysis) result.analysis = {}
  if (!result.analysis.orderMapping) result.analysis.orderMapping = {}

  const axisOrderResult = calcOrder(sortAxis, yField, dataset.flat(2))

  result.analysis.orderMapping[yField] = axisOrderResult

  return result
}
