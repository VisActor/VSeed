import type { BaseTableConstructorOptions } from '@visactor/vtable/es/ts-types'
import type { SpecPipe } from 'src/types'

export const bodyStyle: SpecPipe = (spec) => {
  const result = { ...spec } as BaseTableConstructorOptions
  const fontSize = 12
  const fontColor = '#141414'
  const borderColor = 'rgb(224, 224, 224)'
  const backgroundColor = 'transparent'

  const hoverCellBackgroundColor = 'rgba(66, 132, 255, 0.4)'
  const hoverInlineRowBackgroundColor = 'rgba(66, 132, 255, 0.1)'
  const hoverInlineColumnBackgroundColor = 'rgba(66, 132, 255, 0.1)'

  if (!result.theme) result.theme = {}

  result.theme.bodyStyle = {
    borderColor: [borderColor, borderColor],
    borderLineWidth: 1,
    padding: [8.6, 12, 8.6, 12],
    textAlign: 'right',
    hover: {
      cellBgColor: hoverCellBackgroundColor,
      inlineRowBgColor: hoverInlineRowBackgroundColor,
      inlineColumnBgColor: hoverInlineColumnBackgroundColor,
    },
    fontSize: fontSize,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
    color: fontColor,
    bgColor: backgroundColor,
    lineHeight: fontSize * 1.5,
  }

  return result
}
