import type { PivotChartConstructorOptions } from '@visactor/vtable'
import { isCombination, isPivot } from 'src/pipeline/utils'
import type { SpecPipe } from 'src/types'

export const pivotGridStyle: SpecPipe = (spec, context) => {
  const { vseed } = context

  const onlyCombination = !isPivot(vseed) && isCombination(vseed)

  const result = { ...spec } as PivotChartConstructorOptions
  const transparent = 'rgba(0,0,0,0)'

  const borderColor = '#e3e5eb'
  const bodyFontColor = '#141414'
  const headerFontColor = '#21252c'
  const headerBackgroundColor = 'rgba(0,0,0,0)'
  const hoverHeaderBackgroundColor = onlyCombination ? transparent : '#D9DDE4'
  const hoverHeaderInlineBackgroundColor = onlyCombination ? transparent : '#D9DDE455'

  return {
    ...result,
    theme: {
      underlayBackgroundColor: transparent,
      bodyStyle: {
        borderColor,
        color: bodyFontColor,
        borderLineWidth: [1, 1, 1, 1],
        bgColor: transparent,
        hover: {
          cellBgColor: 'transparent',
        },
      },
      headerStyle: {
        borderColor,
        fontSize: 12,
        borderLineWidth: 1,
        color: headerFontColor,
        textAlign: 'center',
        bgColor: headerBackgroundColor,
        hover: {
          cellBgColor: hoverHeaderBackgroundColor,
          inlineRowBgColor: hoverHeaderInlineBackgroundColor || undefined,
          inlineColumnBgColor: hoverHeaderInlineBackgroundColor || undefined,
        },
      },
      rowHeaderStyle: {
        borderColor,
        fontSize: 12,
        color: headerFontColor,
        borderLineWidth: 1,
        bgColor: headerBackgroundColor,
        hover: {
          cellBgColor: hoverHeaderBackgroundColor,
          inlineRowBgColor: hoverHeaderInlineBackgroundColor || undefined,
          inlineColumnBgColor: hoverHeaderInlineBackgroundColor || undefined,
        },
      },
      cornerHeaderStyle: {
        borderColor,
        textAlign: 'center',
        fontSize: 12,
        color: headerFontColor,
        fontWeight: 'bold',
        borderLineWidth: 1,
        bgColor: headerBackgroundColor,
        frameStyle: {
          borderColor,
          borderLineWidth: [1, 0, 0, 1],
        },
        hover: {
          cellBgColor: hoverHeaderBackgroundColor,
          inlineRowBgColor: hoverHeaderInlineBackgroundColor || undefined,
          inlineColumnBgColor: hoverHeaderInlineBackgroundColor || undefined,
        },
      },
      cornerRightTopCellStyle: {
        borderColor,
        borderLineWidth: 0,
        frameStyle: {
          borderColor,
          borderLineWidth: [1, 1, 0, 1],
        },
        bgColor: headerBackgroundColor,
        hover: {
          cellBgColor: hoverHeaderBackgroundColor,
        },
      },
      cornerLeftBottomCellStyle: {
        borderColor,
        borderLineWidth: [1, 0, 1, 1],
        bgColor: headerBackgroundColor,
        frameStyle: {
          borderColor,
          borderLineWidth: [1, 0, 1, 1],
        },
        hover: {
          cellBgColor: hoverHeaderBackgroundColor,
        },
      },
      cornerRightBottomCellStyle: {
        borderColor,
        borderLineWidth: 0,
        bgColor: headerBackgroundColor,
        frameStyle: {
          borderColor,
          borderLineWidth: [1, 1, 1, 1],
        },
        hover: {
          cellBgColor: hoverHeaderBackgroundColor,
        },
      },
      rightFrozenStyle: {
        borderColor,
        borderLineWidth: 1,
        bgColor: headerBackgroundColor,
        hover: {
          cellBgColor: hoverHeaderBackgroundColor,
        },
      },
      bottomFrozenStyle: {
        borderColor,
        borderLineWidth: 1,
        bgColor: headerBackgroundColor,
        hover: {
          cellBgColor: hoverHeaderBackgroundColor,
        },
      },
      selectionStyle: {
        cellBgColor: '',
        cellBorderColor: '',
      },
      frameStyle: {
        borderColor,
        cornerRadius: 4,
      },
    },
  }
}
