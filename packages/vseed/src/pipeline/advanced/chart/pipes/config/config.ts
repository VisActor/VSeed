import { pick } from 'remeda'
import type { AdvancedPipe, AdvancedVSeed, Config } from 'src/types'

export const lineConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }

  const config = pick(vseed, [
    'backgroundColor',
    'color',
    'label',
    'legend',
    'tooltip',
    'xAxis',
    'yAxis',
    'crosshairLine',
  ]) as Config['line']

  result.config = {
    ...(result.config || {}),
    [chartType]: {
      ...config,
    },
  }

  return result as AdvancedVSeed
}

export const columnConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }

  const config = pick(vseed, [
    'backgroundColor',
    'color',
    'label',
    'legend',
    'tooltip',
    'xAxis',
    'yAxis',
    'crosshairRect',
    'stackCornerRadius',
  ]) as Config['column']

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

  const config = pick(vseed, ['backgroundColor', 'color', 'label', 'legend', 'tooltip']) as Config['pie']

  result.config = {
    ...(result.config || {}),
    [chartType]: {
      ...config,
    },
  }

  return result as AdvancedVSeed
}

export const areaConfig: AdvancedPipe = lineConfig
export const areaPercentConfig: AdvancedPipe = lineConfig
export const scatterConfig: AdvancedPipe = lineConfig

export const barConfig: AdvancedPipe = columnConfig
export const barParallelConfig: AdvancedPipe = columnConfig
export const barPercentConfig: AdvancedPipe = columnConfig
export const columnParallelConfig: AdvancedPipe = columnConfig
export const columnPercentConfig: AdvancedPipe = columnConfig

export const donutConfig: AdvancedPipe = pieConfig
export const roseConfig: AdvancedPipe = pieConfig
export const roseParallelConfig: AdvancedPipe = pieConfig
export const funnelConfig: AdvancedPipe = pieConfig
export const heatmapConfig: AdvancedPipe = pieConfig
export const radarConfig: AdvancedPipe = pieConfig