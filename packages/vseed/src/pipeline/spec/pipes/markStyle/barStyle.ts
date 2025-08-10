import type { IBarChartSpec } from '@visactor/vchart'
import { selector } from '../../../../dataSelector'
import type { Datum, SpecPipe } from 'src/types'
import type { IModelMarkAttributeContext } from '@visactor/vchart/esm/compile/mark'

export const barStyle: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle, encoding } = advancedVSeed
  const { barStyle } = markStyle
  if (!barStyle) {
    return spec
  }
  const result = { ...spec } as IBarChartSpec

  const {
    selector: barSelector,
    barBorderColor,
    barBorderStyle,
    barBorderWidth,
    barColor,
    barColorOpacity,
    barRadius,
  } = barStyle

  return {
    ...result,
    bar: {
      style: {
        fill: barColor
          ? (datum: Datum, context: IModelMarkAttributeContext) => {
              if (selector(datum, barSelector)) {
                return barColor
              }
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return context.seriesColor(datum[encoding[0]?.group?.[0]]) as string
            }
          : undefined,
        fillOpacity: barColorOpacity
          ? (datum: Datum) => {
              if (selector(datum, barSelector)) {
                return barColorOpacity
              }
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return 1
            }
          : undefined,
        stroke: barBorderColor
          ? (datum: Datum, context: IModelMarkAttributeContext) => {
              if (selector(datum, barSelector)) {
                return barBorderColor
              }
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return context.seriesColor(datum[encoding[0]?.group?.[0]]) as string
            }
          : undefined,
        lineWidth: barBorderWidth
          ? (datum: Datum) => {
              if (selector(datum, barSelector)) {
                return barBorderWidth
              }
              return 0
            }
          : undefined,
        lineDash: barBorderStyle
          ? (datum: Datum) => {
              if (selector(datum, barSelector)) {
                if (barBorderStyle === 'solid') {
                  return [0, 0]
                } else if (barBorderStyle === 'dashed') {
                  return [5, 5]
                } else if (barBorderStyle === 'dotted') {
                  return [1, 5]
                }
              }
              return [0, 0]
            }
          : undefined,
        cornerRadius: barRadius
          ? (datum: Datum) => {
              if (selector(datum, barSelector)) {
                return barRadius
              }
              return 0
            }
          : undefined,
      },
    },
  }
}
