import type { AdvancedPipe } from 'src/types'

export const vtableBaseConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { backgroundColor } = vseed
  return {
    ...advancedVSeed,
    baseConfig: {
      vtable: {
        backgroundColor,
      },
    },
  }
}

export const vchartBaseConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { backgroundColor } = vseed
  return {
    ...advancedVSeed,
    baseConfig: {
      vchart: {
        backgroundColor,
      },
    },
  }
}
