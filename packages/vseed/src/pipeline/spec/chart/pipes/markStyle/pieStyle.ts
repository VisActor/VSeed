import type { IPieChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const pieStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { dataset } = advancedVSeed
  const showStroke = dataset.length <= 30
  const config = advancedVSeed.config?.[chartType as 'pie']

  const result = {
    ...spec,
    pie: {
      style: {
        stroke: config?.backgroundColor ?? '#ffffff',
        lineWidth: showStroke ? 1 : 0,
      },
    },
  } as Required<IPieChartSpec>

  if ((spec as IPieChartSpec).outerRadius) {
    result.pie.state = {
      hover: {
        outerRadius: ((spec as IPieChartSpec).outerRadius as number) * 1.1,
      },
    }
  }

  if (config?.cornerRadius) {
    result.pie.style!.cornerRadius = config.cornerRadius
  }

  return result
}
