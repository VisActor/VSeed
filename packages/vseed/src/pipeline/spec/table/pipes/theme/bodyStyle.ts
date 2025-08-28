import type { BaseTableConstructorOptions } from '@visactor/vtable/es/ts-types'
import type { SpecPipe, TableConfig } from 'src/types'

export const bodyStyle: SpecPipe = (spec, context) => {
  const result = { ...spec } as BaseTableConstructorOptions
  const { advancedVSeed } = context
  const { chartType, config } = advancedVSeed
  const themeConfig = config?.[chartType] as TableConfig

  if (!result.theme || !themeConfig) return result

  // basic
  const borderColor = themeConfig.borderColor || 'rgb(224, 224, 224)'
  const backgroundColor = themeConfig.bodyBackgroundColor || '#fff'
  const fontColor = themeConfig.bodyFontColor || '#1B1F23'
  const fontSize = themeConfig.bodyFontSize || 12
  // Interaction
  const hoverCellBgColor = themeConfig.hoverBodyBackgroundColor || '#bedaff'
  const hoverInlineColor = themeConfig.hoverBodyInlineBackgroundColor || '#bedaff'

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
