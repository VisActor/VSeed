import { pick } from 'remeda'
import type { AdvancedPipe, VChartBaseConfig, VTableBaseConfig } from 'src/types'

export const vchartBaseConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context

  const result = {
    ...advancedVSeed,
  }

  const config: VChartBaseConfig = pick(vseed, ['backgroundColor', 'color', 'label', 'legend', 'tooltip'])

  result.baseConfig = {
    vchart: {
      ...config,
    },
  }
  return result
}

export const vtableBaseConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const config: VTableBaseConfig = pick(vseed, ['backgroundColor'])

  return {
    ...advancedVSeed,
    baseConfig: {
      vtable: {
        ...config,
      },
    },
  }
}
