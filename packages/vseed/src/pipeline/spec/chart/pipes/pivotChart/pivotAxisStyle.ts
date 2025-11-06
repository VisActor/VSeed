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

        if (axis.grid && axis.grid.visible && axis.grid.style) {
          axis.grid.style.strokeOpacity = 0.3
        }
      })
    }

    return result
  }
}
