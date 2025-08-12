import type { IBarChartSpec } from '@visactor/vchart'
import { selector } from '../../../../dataSelector'
import type { BarStyle, Datum, SpecPipe } from 'src/types'
import type { IModelMarkAttributeContext } from '@visactor/vchart/esm/compile/mark'
import { isNumber } from 'remeda'

export const barStyle: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { markStyle, encoding } = advancedVSeed
  const { barStyle } = markStyle
  if (!barStyle) {
    return spec
  }
  const result = { ...spec } as IBarChartSpec

  // 优先级: 后者覆盖前者
  const barStyles = (Array.isArray(barStyle) ? barStyle : [barStyle]).reverse() as BarStyle[]

  const fill = (datum: Datum, context: IModelMarkAttributeContext) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const defaultColor = context.seriesColor(datum[encoding[0]?.group?.[0]]) as string
    for (const style of barStyles) {
      if (selector(datum, style.selector)) {
        if (style?.barColor) {
          return style?.barColor
        }
      }
    }
    return defaultColor
  }

  const fillOpacity = (datum: Datum) => {
    const defaultColorOpacity = 1
    for (const style of barStyles) {
      if (selector(datum, style.selector)) {
        if (isNumber(style?.barColorOpacity)) {
          return style?.barColorOpacity
        }
      }
    }
    return defaultColorOpacity
  }

  const stroke = (datum: Datum, context: IModelMarkAttributeContext) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const defaultBorderColor = context.seriesColor(datum[encoding[0]?.group?.[0]]) as string
    for (const style of barStyles) {
      if (selector(datum, style.selector)) {
        if (style?.barBorderColor) {
          return style?.barBorderColor
        }
      }
    }
    return defaultBorderColor
  }

  const lineWidth = (datum: Datum) => {
    const defaultBorderWidth = 0
    for (const style of barStyles) {
      if (selector(datum, style.selector)) {
        if (isNumber(style?.barBorderWidth)) {
          return style?.barBorderWidth
        }
      }
    }
    return defaultBorderWidth
  }

  const lineDash = (datum: Datum) => {
    const defaultBorderStyle = [0, 0]
    for (const style of barStyles) {
      if (selector(datum, style.selector)) {
        if (style?.barBorderStyle) {
          if (style.barBorderStyle === 'solid') {
            return [0, 0]
          } else if (style.barBorderStyle === 'dashed') {
            return [5, 2]
          } else if (style.barBorderStyle === 'dotted') {
            return [2, 5]
          }
          return defaultBorderStyle
        }
      }
    }
    return defaultBorderStyle
  }

  const cornerRadius = (datum: Datum) => {
    const defaultRadius = 0
    for (const style of barStyles) {
      if (selector(datum, style.selector)) {
        if (isNumber(style?.barRadius)) {
          return style?.barRadius
        }
      }
    }
    return defaultRadius
  }

  return {
    ...result,
    bar: {
      style: {
        fill,
        fillOpacity,
        stroke,
        lineWidth,
        lineDash,
        cornerRadius,
      },
    },
  }
}
