import type { ExecPipelineType, Pipe } from 'src/types'

/**
 * 执行pipeline, 每个pipe负责构建结果的一部分, 构建完成后得到完整的目标结果
 * @param pipeline pipeline数组, 每个pipe负责构建结果的一部分
 * @param initialValue 初始值
 * @param context 上下文
 * @returns 执行后的结果
 */
export const execPipeline: ExecPipelineType = <T, U>(
  pipeline: Array<Pipe<T, U>>,
  context: U,
  initialValue: Partial<T> = {},
): T => {
  const result = pipeline.reduce((prev, cur) => {
    return cur(prev, context)
  }, initialValue)
  return result as T
}
