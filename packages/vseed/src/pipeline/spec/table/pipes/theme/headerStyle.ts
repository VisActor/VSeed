import type { SpecPipelineContext, TableConfig } from 'src/types'
import type { ThemeLike } from './type'
import type { ListTableConstructorOptions, PivotTableConstructorOptions } from '@visactor/vtable'

export const headerStyle = <T extends ListTableConstructorOptions | PivotTableConstructorOptions>(
  spec: T,
  context: SpecPipelineContext,
): Partial<T> => {
  const result = { ...spec }
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
  const hoverCellBgColor = themConfig.hoverHeaderBackgroundColor || '#bedaff'
  const hoverInlineColor = themConfig.hoverHeaderInlineBackgroundColor || '#bedaff'

  ;(result.theme as ThemeLike).headerStyle = {
    borderColor: borderColor,
    borderLineWidth: 1,
    padding: [8, 12, 8, 12],
    textAlign: 'center',
    hover: {
      cellBgColor: hoverCellBgColor,
      inlineRowBgColor: hoverInlineColor,
      inlineColumnBgColor: hoverInlineColor,
    },
    frameStyle: {
      borderColor: borderColor,
      borderLineWidth: [0, 0, 1, 0],
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
