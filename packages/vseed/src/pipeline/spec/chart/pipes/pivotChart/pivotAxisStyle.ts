import type { ILineChartSpec } from '@visactor/vchart'
import type { SpecPipe } from 'src/types'

export const pivotAxisStyle = (axisStyle: SpecPipe): SpecPipe => {
  return (spec, context) => {
    const result = axisStyle(spec, context) as ILineChartSpec

    if (result.axes) {
      result.axes.forEach((axis: any) => {
        axis.domainLine = {
          visible: false,
        }
      })
    }

    return result
  }
}
