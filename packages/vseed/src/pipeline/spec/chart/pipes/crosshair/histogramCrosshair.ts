import type { ICartesianCrosshairSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import { verticalCrosshairRect } from './verticalCrosshairRect'
import { getDefaultXFormatterOfHistogram } from '../../utils/histogram'
import { isArray } from '@visactor/vutils'

export const histogramVerticalCrosshairRect: VChartSpecPipe = (spec, context) => {
  const result = verticalCrosshairRect(spec, context)
  if (!result.crosshair) {
    return result
  }
  const crosshair = result.crosshair as ICartesianCrosshairSpec
  if (!crosshair.xField) {
    return result
  }
  const defaultXFormatter = getDefaultXFormatterOfHistogram(context.advancedVSeed)
  crosshair.xField = {
    ...(crosshair.xField || {}),
    label: {
      ...(crosshair.xField?.label || {}),
      formatMethod: (text) => {
        if (isArray(text)) {
          return text
        }
        const binRange = `${text}`.split('~')
        const binStart = defaultXFormatter(+binRange[0])
        const binEnd = defaultXFormatter(+binRange[1])
        return binRange.length === 1 ? binStart : `[${binStart}, ${binEnd})`
      },
    },
  }

  return result
}
