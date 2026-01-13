import type { Column, VChartSpecPipe } from 'src/types'
import type { BrushConfig } from 'src/types/properties/brush/zBrush'

export const brush: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as any
  const { advancedVSeed, vseed } = context
  const { brush = {}, chartType } = vseed as Column

  const theme = (advancedVSeed.config as any)?.[chartType]?.brush ?? ({} as BrushConfig)

  const enable = brush.enable ?? theme?.enable

  if (enable === false) {
    return result
  }

  result.brush = {
    visible: true,
    removeOnClick: brush.removeOnClick,
    brushMode: brush?.brushMode || 'single',
    brushType: brush?.brushType || 'rect',
    inBrush: {
      opacity: theme.inBrushStyle?.opacity,
      stroke: theme.inBrushStyle?.stroke,
      lineWidth: theme.inBrushStyle?.lineWidth,
    },
    outOfBrush: {
      opacity: theme.outOfBrushStyle?.opacity,
      stroke: theme.outOfBrushStyle?.stroke,
      lineWidth: theme.outOfBrushStyle?.lineWidth,
    },
  }

  if (result.label && result.label.visible !== false) {
    if (!result.label.state) {
      result.label.state = {}
    }

    result.label.state.outOfBrush = {
      opacity: result.brush.outOfBrush.opacity,
    }
    result.label.state.inBrush = {
      opacity: result.brush.inBrush.opacity,
    }
  }

  return result
}
