import type { BodyCellStyle } from 'src/types'

const tableStyleMap = {
  backgroundColor: 'bgColor',
  textColor: 'color',
  textFontSize: 'fontSize',
  borderColor: 'borderColor',
  borderLineWidth: 'borderLineWidth',
}

export const pickBodyCellStyle = (bodyCellStyle: BodyCellStyle) => {
  return (Object.keys(tableStyleMap) as Array<keyof typeof tableStyleMap>).reduce<Record<string, any>>((acc, key) => {
    if (key in bodyCellStyle) {
      acc[tableStyleMap[key]] = bodyCellStyle[key]
    }

    return acc
  }, {})
}
