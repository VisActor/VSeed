import type { ILineChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const lineStyleFilter = (pipe: VChartSpecPipe): VChartSpecPipe => {
  return (spec, context) => {
    if (spec.type === 'line') {
      return pipe(spec, context) as ILineChartSpec
    }

    return spec
  }
}
