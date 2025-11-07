import type { AdvancedPipe, Dataset, DatasetReshapeInfo, Line } from 'src/types'
import { calcOrder } from './common'

export const sortXBandAxis: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { sort: sortAxis } = vseed as Line
  const { datasetReshapeInfo, dataset } = advancedVSeed as { datasetReshapeInfo: DatasetReshapeInfo; dataset: Dataset }
  const { unfoldInfo } = datasetReshapeInfo[0]
  const xField = unfoldInfo.encodingX
  if (!sortAxis || !xField) {
    return advancedVSeed
  }
  if (!result.analysis) result.analysis = {}
  if (!result.analysis.orderMapping) result.analysis.orderMapping = {}

  const axisOrderResult = calcOrder(sortAxis, xField, dataset.flat(2))

  result.analysis.orderMapping[xField] = axisOrderResult

  return result
}
