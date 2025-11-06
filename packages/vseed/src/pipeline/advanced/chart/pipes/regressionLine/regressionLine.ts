import type { AdvancedPipe, RegressionLineConfig } from 'src/types'

export const regressionLine: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  let keys = [] as string[]

  if (vseed.chartType === 'histogram') {
    keys = ['kdeRegressionLine', 'ecdfRegressionLine']
  } else if (vseed.chartType === 'scatter') {
    keys = ['linearRegressionLine', 'lowessRegressionLine', 'polynomialRegressionLine', 'logisticRegressionLine']
  } else if (vseed.chartType === 'column') {
    keys = ['polynomialRegressionLine']
  }

  if (keys.length) {
    const regressionLineConfig: RegressionLineConfig = {}
    let hasLine = false

    keys.forEach((key: string) => {
      if ((vseed as any)[key]) {
        hasLine = true
        regressionLineConfig[key as keyof RegressionLineConfig] =
          (vseed as any)[key] === true ? {} : (vseed as any)[key]
      }
    })

    return hasLine
      ? {
          ...advancedVSeed,
          regressionLine: regressionLineConfig,
        }
      : advancedVSeed
  }

  return advancedVSeed
}
