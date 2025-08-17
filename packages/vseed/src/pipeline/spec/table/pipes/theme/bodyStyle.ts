import type { BaseTableConstructorOptions } from '@visactor/vtable/es/ts-types'
import { color } from 'd3-color'
import type { SpecPipe, TableConfig } from 'src/types'

export const bodyStyle: SpecPipe = (spec, context) => {
  const result = { ...spec } as BaseTableConstructorOptions
  const { advancedVSeed } = context
  const { customTheme, chartType } = advancedVSeed
  const themConfig = customTheme?.config?.[chartType] as TableConfig

  if (!result.theme || !themConfig) return result

  // basic
  const borderColor = themConfig.borderColor || 'rgb(224, 224, 224)'
  const backgroundColor = themConfig.bodyBackgroundColor || '#fff'
  const fontColor = themConfig.bodyFontColor || '#1B1F23'
  const fontSize = themConfig.bodyFontSize || 12
  // Interaction
  const hoverCellBgColor = themConfig.hoverBodyBackgroundColor || '#bedaff'
  const hoverInlineColor = color(hoverCellBgColor)?.copy({ opacity: 0.1 }).toString()

  result.theme.bodyStyle = {
    borderColor: borderColor,
    borderLineWidth: 1,
    padding: [8.6, 12, 8.6, 12],
    textAlign: 'right',
    hover: {
      cellBgColor: hoverCellBgColor,
      inlineRowBgColor: hoverInlineColor,
      inlineColumnBgColor: hoverInlineColor,
    },
    color: fontColor,
    fontSize: fontSize,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
    bgColor: backgroundColor,
    lineHeight: fontSize * 1.5,
  }

  return result
}
