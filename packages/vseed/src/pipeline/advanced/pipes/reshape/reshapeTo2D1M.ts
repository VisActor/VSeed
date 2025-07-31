import type { AdvancedPipe, Dataset, Measures } from 'src/types'

/**
 * 数据重塑, 将任意维度、任意指标, 重塑为2个维度1个指标.
 * @param advancedVSeed
 * @param context
 * @returns
 */
export const reshapeTo2D1M: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dimensions, measures, dataset } = vseed
  if (!measures || !dimensions || !dataset) {
    return result
  }

  if (measures.length === 0) {
    throw new Error('measures can not be empty')
  }

  console.log(vseed)

  return result
}

/**
 * 融化指定的指标
 * @description 合并指定的指标为1个, 无论多少个, 都能转换为1个, 取名为melt, 意为融化后混合在一起.
 */
const meltMeasures = (dataset: Dataset, measures: Measures) => {}

/**
 * 展开指定的维度
 * @description 展开指定的维度, 根据维度值的数量N(去重), 展开为N指标.
 */
const spreadDimension = () => {}
