import type { AdvancedPipe } from 'src/types'

/**
 * 数据重塑, 将任意维度、任意指标, 重塑为1个维度1个指标.
 * @param result
 * @param context
 * @returns
 */
export const reshapeTo1D1M: AdvancedPipe = (result, context) => {
  const { vseed } = context
  console.log(vseed)
  return result
}
