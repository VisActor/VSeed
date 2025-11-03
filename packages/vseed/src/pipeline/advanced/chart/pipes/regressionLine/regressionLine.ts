import type { AdvancedPipe } from 'src/types'

export const regressionLine: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context

  if ('histogramRegressionLine' in vseed && vseed.chartType === 'histogram') {
    advancedVSeed.histogramRegressionLine = vseed.histogramRegressionLine
  }

  return advancedVSeed
}
