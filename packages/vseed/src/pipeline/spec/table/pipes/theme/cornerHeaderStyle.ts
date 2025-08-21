import type { BaseTableConstructorOptions } from '@visactor/vtable/es/ts-types'
import type { SpecPipe, TableConfig } from 'src/types'

export const cornerHeaderStyle: SpecPipe = (spec, context) => {
  const result = { ...spec } as BaseTableConstructorOptions
  const { advancedVSeed } = context
  const { customTheme, chartType } = advancedVSeed
  const themConfig = customTheme?.config?.[chartType] as TableConfig

  if (!result.theme || !themConfig) return result

  // basic
  const borderColor = themConfig.borderColor || 'rgb(224, 224, 224)'
  const backgroundColor = themConfig.headerBackgroundColor || '#EEF1F5'
  const fontColor = themConfig.headerFontColor || '#1B1F23'
  const fontSize = themConfig.headerFontSize || 12
  // Interaction
  const hoverInlineColor = themConfig.hoverHeaderInlineBackgroundColor
  const hoverCellColor = themConfig.hoverHeaderBackgroundColor

  result.theme.cornerHeaderStyle = {
    borderColor: [borderColor, borderColor],
    borderLineWidth: 1,
    padding: [8, 12, 8, 12],
    textAlign: 'left',
    hover: {
      cellBgColor: hoverCellColor,
      inlineRowBgColor: hoverInlineColor,
      inlineColumnBgColor: hoverInlineColor,
    },
    frameStyle: {
      borderColor: [null, borderColor, borderColor, null],
      borderLineWidth: 1,
    },
    fontSize: fontSize,
    fontVariant: 'normal',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: fontColor,
    bgColor: backgroundColor,
    lineHeight: fontSize * 1.5,
  }

  return result
}
