import type { IBarChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const barStyleFilter = (pipe: VChartSpecPipe): VChartSpecPipe => {
  return (spec, context) => {
    if (spec.type === 'bar') {
      return pipe(spec, context) as IBarChartSpec
    }

    return spec
  }
}
