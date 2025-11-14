import type { ILineChartSpec, IMarkLineSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { SpecPipe, Spec } from 'src/types'
import { isArray, isNumber, isString } from 'remeda'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'

export const annotationVerticalLine: SpecPipe<Spec> = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { annotation, datasetReshapeInfo, config } = advancedVSeed

  const { unfoldInfo, foldInfo } = datasetReshapeInfo[0]

  if (!annotation || !annotation.annotationVerticalLine) {
    return spec
  }

  const theme = config?.[vseed.chartType as 'column']?.annotation?.annotationVerticalLine
  const { annotationVerticalLine } = annotation
  const annotationVerticalLineList = Array.isArray(annotationVerticalLine)
    ? annotationVerticalLine
    : [annotationVerticalLine]

  const positionMap = {
    outsideStart: 'start',
    outsideEnd: 'end',
    outsideMiddle: 'middle',
    insideStart: 'insideStartTop',
    insideMiddle: 'insideMiddleTop',
    insideEnd: 'insideEndTop',
  }
  const markLine = annotationVerticalLineList.flatMap((annotationVerticalLine) => {
    const {
      selector: selectorPoint,
      xValue,
      text = '',
      textPosition = 'insideEnd',
      textColor = theme?.textColor ?? '#ffffff',
      textFontSize = theme?.textFontSize ?? 12,
      textFontWeight = theme?.textFontWeight ?? 400,
      textAlign = 'center',
      textBaseline = 'top',

      lineColor = theme?.lineColor ?? '#212121',
      lineStyle = theme?.lineStyle ?? 'dashed',
      lineVisible = theme?.lineStyle ?? true,
      lineWidth = theme?.lineWidth ?? 1,

      textBackgroundVisible = theme?.textBackgroundVisible ?? true,
      textBackgroundColor = theme?.textBackgroundColor ?? '#212121',
      textBackgroundBorderColor = theme?.textBackgroundBorderColor ?? '#212121',
      textBackgroundBorderRadius = theme?.textBackgroundBorderRadius ?? 4,
      textBackgroundBorderWidth = theme?.textBackgroundBorderWidth ?? 1,
      textBackgroundPadding = theme?.textBackgroundPadding ?? 2,
    } = annotationVerticalLine

    const dataset = advancedVSeed.dataset.flat()

    const generateOneMarkLine = (x: number | string) => ({
      x,
      autoRange: true,
      zIndex: ANNOTATION_Z_INDEX,
      line: {
        style: {
          visible: lineVisible,
          stroke: lineColor,
          lineStyle: lineStyle,
          lineWidth: lineWidth,
          lineDash: lineStyle === 'dashed' ? [5, 2] : lineStyle === 'dotted' ? [2, 5] : [0],
        },
      },
      label: {
        confine: true,
        text: text,
        position: (positionMap as any)[textPosition || 'insideEnd'],
        style: {
          opacity: 0.95,
          dx: 5,
          visible: true,
          stroke: textBackgroundColor,
          lineWidth: 1,
          textAlign: textAlign,
          textBaseline: textBaseline,
          fill: textColor,
          fontSize: textFontSize,
          fontWeight: textFontWeight,
        },
        labelBackground: {
          visible: textBackgroundVisible,
          padding: textBackgroundPadding,
          style: {
            opacity: 0.95,
            dx: 5,
            cornerRadius: textBackgroundBorderRadius,
            fill: textBackgroundColor,
            fillOpacity: 1,
            stroke: textBackgroundBorderColor,
            lineWidth: textBackgroundBorderWidth,
          },
        },
      },
      startSymbol: {
        visible: theme?.startSymbolVisible ?? true,
        symbolType: theme?.startSymbolType ?? 'triangleDown',
        size: 5 + (lineWidth || 1),
        style: {
          dy: -3,
          fill: lineColor,
        },
      },
      endSymbol: {
        visible: theme?.endSymbolVisible ?? false,
        symbolType: theme?.endSymbolType ?? 'arrow',
        size: 10 + (lineWidth || 1),
        style: {
          dy: 4,
          fill: lineColor,
        },
      },
    })

    if ((!selectorPoint && isArray(xValue)) || isString(xValue) || isNumber(xValue)) {
      const xValueArr = Array.isArray(xValue) ? xValue : [xValue]
      return xValueArr.map(generateOneMarkLine)
    }

    const selectedData = selectorPoint ? dataset.filter((datum) => selector(datum, selectorPoint)) : []

    return selectedData.map((datum) => {
      if (datum[unfoldInfo.encodingX]) {
        return generateOneMarkLine(datum[unfoldInfo.encodingX] as string)
      }
      if (datum[foldInfo.measureValue]) {
        return generateOneMarkLine(datum[foldInfo.measureValue] as string)
      }
      return {}
    })
  }) as IMarkLineSpec[]

  const specMarkLine = ((spec as ILineChartSpec).markLine as IMarkLineSpec[]) || []
  const newMarkLine = [...specMarkLine, ...(markLine || [])]

  return {
    ...spec,
    markLine: newMarkLine,
  }
}
