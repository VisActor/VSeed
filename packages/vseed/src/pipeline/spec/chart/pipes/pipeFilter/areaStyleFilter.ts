import type { IAreaChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const areaStyleFilter = (pipe: VChartSpecPipe): VChartSpecPipe => {
  return (spec, context) => {
    if (spec.type === 'area') {
      return pipe(spec, context) as IAreaChartSpec
    }

    return spec
  }
}
