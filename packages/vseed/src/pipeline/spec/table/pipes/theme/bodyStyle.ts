import type { SpecPipe, TableConfig } from 'src/types'
import type { ThemeLike, WithTheme } from './type'

export const bodyStyle: SpecPipe = (spec, context) => {
  const result = { ...spec } as Partial<typeof spec> & WithTheme
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

  if (!result.theme) result.theme = {}
  ;(result.theme as ThemeLike).bodyStyle = {
    borderColor: borderColor,
    borderLineWidth: 1,
    padding: [8, 12, 8, 12],
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
