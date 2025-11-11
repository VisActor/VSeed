import type { ITooltipSpec } from '@visactor/vchart'
import type { TooltipConfig } from 'src/types/properties'

export const getTooltipStyle = (tooltipConfig: TooltipConfig) => {
  return {
    panel: {
      padding: tooltipConfig.padding,
      border: {
        radius: tooltipConfig.borderRadius,
        width: tooltipConfig.borderWidth,
        color: tooltipConfig.borderColor,
      },
      backgroundColor: tooltipConfig.backgroundColor,
    },
    keyLabel: {
      lineHeight: tooltipConfig.lineHeight,
      fontSize: tooltipConfig.fontSize,
      fontColor: tooltipConfig.keyColor,
    },
    valueLabel: {
      lineHeight: tooltipConfig.lineHeight,
      fontSize: tooltipConfig.fontSize,
      fontColor: tooltipConfig.valueColor,
      fontWeight: 'medium',
    },
    titleLabel: {
      fontSize: tooltipConfig.fontSize,
      lineHeight: tooltipConfig.lineHeight,
      fontColor: tooltipConfig.titleColor,
      fontWeight: 'bold',
    },
  } as ITooltipSpec['style']
}
