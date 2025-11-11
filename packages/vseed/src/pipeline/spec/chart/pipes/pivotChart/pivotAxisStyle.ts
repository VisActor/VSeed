import type { ILineChartSpec } from '@visactor/vchart'
import { BAND_AXIS_INNER_OFFSET_IN_PIVOT } from 'src/pipeline/utils/constant'
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

        if (axis.type === 'band') {
          if (axis.orient === 'left' || axis.orient === 'right') {
            axis.innerOffset = {
              top: BAND_AXIS_INNER_OFFSET_IN_PIVOT,
              bottom: BAND_AXIS_INNER_OFFSET_IN_PIVOT,
            }
          } else if (axis.orient === 'top' || axis.orient === 'bottom') {
            axis.innerOffset = {
              left: BAND_AXIS_INNER_OFFSET_IN_PIVOT,
              right: BAND_AXIS_INNER_OFFSET_IN_PIVOT,
            }
          }
        }
      })
    }

    return result
  }
}
