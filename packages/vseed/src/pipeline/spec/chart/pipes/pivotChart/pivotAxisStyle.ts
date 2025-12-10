import type { ILineChartSpec } from '@visactor/vchart'
import { MeasureId } from 'src/dataReshape'
import { BAND_AXIS_INNER_OFFSET_IN_PIVOT } from 'src/pipeline/utils/constant'
import type { Config, VChartSpecPipe } from 'src/types'

export const pivotAxisStyle = (axisStyle: VChartSpecPipe): VChartSpecPipe => {
  return (spec, context) => {
    const result = axisStyle(spec, context) as ILineChartSpec

    if (result.axes) {
      const { advancedVSeed } = context
      const { config, chartType, encoding } = advancedVSeed
      const themConfig = (config?.[chartType] as Config['line'])?.pivotGrid ?? {}

      result.axes.forEach((axis: any) => {
        axis.domainLine = {
          visible: false,
        }

        if (themConfig.chartGridColor && axis.grid && axis.grid.visible && axis.grid.style) {
          axis.grid.style.stroke = themConfig.chartGridColor
        }

        if (themConfig.axisLabelColor && axis.label && axis.label.visible && axis.label.style) {
          axis.label.style.fill = themConfig.axisLabelColor
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
        } else if (axis.type === 'linear') {
          if (axis.orient === 'top' || axis.orient === 'bottom') {
            axis.label.flush = true
          }

          if (axis.title.text && encoding.color && encoding.color.length && !encoding.color.includes(MeasureId)) {
            axis.title.visible = true
          }
        }
      })
    }

    return result
  }
}
