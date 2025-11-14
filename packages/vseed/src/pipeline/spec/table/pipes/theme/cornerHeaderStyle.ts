import type { PivotTableSpecPipe, TableConfig } from 'src/types'
import type { ThemeLike, WithTheme } from './type'

export const cornerHeaderStyle: PivotTableSpecPipe = (spec, context) => {
  const result = { ...spec } as Partial<typeof spec> & WithTheme
  const { advancedVSeed } = context
  const { config, chartType } = advancedVSeed
  const themConfig = config?.[chartType] as TableConfig

  if (!result.theme || !themConfig) return result

  // basic
  const borderColor = themConfig.borderColor || 'rgb(224, 224, 224)'
  const backgroundColor = themConfig.headerBackgroundColor || '#EEF1F5'
  const fontColor = themConfig.headerFontColor || '#1B1F23'
  const fontSize = themConfig.headerFontSize || 12
  // Interaction
  const hoverInlineColor = themConfig.hoverHeaderInlineBackgroundColor
  const hoverCellColor = themConfig.hoverHeaderBackgroundColor

  ;(result.theme as ThemeLike).cornerHeaderStyle = {
    borderColor: [borderColor, borderColor],
    borderLineWidth: 1,
    padding: [8, 12, 8, 12],
    textAlign: 'left',
    hover: {
      cellBgColor: hoverCellColor || undefined,
      inlineRowBgColor: hoverInlineColor || undefined,
      inlineColumnBgColor: hoverInlineColor || undefined,
    },
    frameStyle: {
      borderColor: borderColor,
      borderLineWidth: [0, 1, 1, 0],
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
