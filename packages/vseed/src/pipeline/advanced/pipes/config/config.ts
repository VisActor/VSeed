import { pick } from 'remeda'
import type { AdvancedPipe, AdvancedVSeed, Config } from '../../../../types'

export const lineConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }

  const config = pick(vseed, ['xAxis', 'yAxis']) as Config['line']

  result.config = {
    ...(result.config || {}),
    [chartType]: {
      ...config,
    },
  }

  return result as AdvancedVSeed
}

export const pieConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }

  const config = pick(vseed, []) as Config['pie']

  result.config = {
    ...(result.config || {}),
    [chartType]: {
      ...config,
    },
  }

  return result as AdvancedVSeed
}

export const barConfig: AdvancedPipe = lineConfig
export const barParallelConfig: AdvancedPipe = lineConfig
export const barPercentConfig: AdvancedPipe = lineConfig
export const columnConfig: AdvancedPipe = lineConfig
export const columnParallelConfig: AdvancedPipe = lineConfig
export const columnPercentConfig: AdvancedPipe = lineConfig
export const areaConfig: AdvancedPipe = lineConfig
export const areaPercentConfig: AdvancedPipe = lineConfig
