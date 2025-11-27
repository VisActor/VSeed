import type { ILineChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const pointStyleFilter = (pipe: VChartSpecPipe): VChartSpecPipe => {
  return (spec, context) => {
    if (spec.type === 'line' || spec.type === 'area') {
      return pipe(spec, context) as ILineChartSpec
    }

    return spec
  }
}
