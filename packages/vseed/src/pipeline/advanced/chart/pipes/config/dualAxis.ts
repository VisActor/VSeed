import { pick } from 'remeda'
import type { AdvancedPipe, AdvancedVSeed, Config } from 'src/types'

export const dualAxisConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }

  const config = pick(vseed, [
    // common
    'backgroundColor',
    'color',
    'label',
    'legend',
    'tooltip',
    'xAxis',

    // only for dualAxis
    'dualChartType',
    'alignTicks',
    'primaryYAxis',
    'secondaryYAxis',
    'crosshairLine',
    'crosshairRect',
  ]) as Config['dualAxis']

  result.config = {
    ...(result.config || {}),
    [chartType]: {
      ...config,
    },
  }

  return result as AdvancedVSeed
}
