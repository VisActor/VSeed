import type { PivotChartConstructorOptions } from '@visactor/vtable'
import { isCombination, isPivot } from 'src/pipeline/utils'
import type { Config, SpecPipe } from 'src/types'
import { isNullish } from 'remeda'

export const pivotGridStyle: SpecPipe = (spec, context) => {
  const { vseed, advancedVSeed } = context
  const { config, chartType } = advancedVSeed
  const themConfig = (config?.[chartType] as Config['line'])?.pivotGrid ?? {}

  const onlyCombination = !isPivot(vseed) && isCombination(vseed)

  const result = { ...spec } as PivotChartConstructorOptions
  const transparent = 'rgba(0,0,0,0)'

  const borderColor = themConfig.borderColor ?? '#e3e5eb'
  const bodyFontColor = themConfig.bodyFontColor ?? '#141414'
  const headerFontColor = themConfig.headerFontColor ?? '#21252c'
  const headerBackgroundColor = themConfig.headerBackgroundColor ?? 'rgba(0,0,0,0)'
  const hoverHeaderBackgroundColor = onlyCombination
    ? transparent
    : (themConfig.hoverHeaderBackgroundColor ?? '#D9DDE4')
  const hoverHeaderInlineBackgroundColor = onlyCombination
    ? transparent
    : (themConfig.hoverHeaderInlineBackgroundColor ?? '#D9DDE455')
  const outlineBorderLineWidth = themConfig.outlineBorderLineWidth ?? 0
  const frameCornerRadius = themConfig.frameCornerRadius ?? 0

  if (!isNullish(themConfig.minChartWidth)) {
    result.defaultColWidth = themConfig.minChartWidth
  }

  if (!isNullish(themConfig.minChartHeight)) {
    result.defaultRowHeight = themConfig.minChartHeight
  }

  return {
    ...result,
    theme: {
      underlayBackgroundColor: transparent,
      bodyStyle: {
        borderColor,
        color: bodyFontColor,
        borderLineWidth: [1, outlineBorderLineWidth, 0, 1],
        bgColor: transparent,
        hover: {
          cellBgColor: 'transparent',
        },
      },
      headerStyle: {
        borderColor,
        fontSize: 12,
        borderLineWidth: [outlineBorderLineWidth, outlineBorderLineWidth, 1, 1],
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
        padding: [0, 4, 0, 4],
        borderLineWidth: [1, 1, 1, outlineBorderLineWidth],
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
        padding: [0, 4, 0, 4],
        fontWeight: 'bold',
        borderLineWidth: [outlineBorderLineWidth, 1, 1, outlineBorderLineWidth],
        bgColor: headerBackgroundColor,
        frameStyle: {
          borderColor,
          borderLineWidth: [outlineBorderLineWidth, 0, 0, outlineBorderLineWidth],
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
          borderLineWidth: [outlineBorderLineWidth, 1, 0, 1],
        },
        bgColor: headerBackgroundColor,
        hover: {
          cellBgColor: hoverHeaderBackgroundColor,
        },
      },
      cornerLeftBottomCellStyle: {
        borderColor,
        borderLineWidth: [1, 0, outlineBorderLineWidth, outlineBorderLineWidth],
        bgColor: headerBackgroundColor,
        frameStyle: {
          borderColor,
          borderLineWidth: [1, 0, outlineBorderLineWidth, outlineBorderLineWidth],
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
        borderLineWidth: [1, outlineBorderLineWidth, outlineBorderLineWidth, 1],
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
        cornerRadius: frameCornerRadius,
        borderLineWidth: outlineBorderLineWidth,
      },
    },
  }
}
