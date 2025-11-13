import type { ILineChartSpec, IMarkLineSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { SpecPipe } from 'src/types'
import { isArray, isNumber, isString } from 'remeda'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'

export const annotationHorizontalLine: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { annotation, datasetReshapeInfo, config } = advancedVSeed
  const { foldInfo, unfoldInfo } = datasetReshapeInfo[0]

  if (!annotation || !annotation.annotationHorizontalLine) {
    return spec
  }
  const theme = config?.[vseed.chartType as 'column']?.annotation?.annotationHorizontalLine
  const { annotationHorizontalLine } = annotation
  const annotationHorizontalLineList = Array.isArray(annotationHorizontalLine)
    ? annotationHorizontalLine
    : [annotationHorizontalLine]

  const positionMap = {
    outsideStart: 'start',
    outsideEnd: 'end',
    outsideMiddle: 'middle',
    insideStart: 'insideStartTop',
    insideMiddle: 'insideMiddleTop',
    insideEnd: 'insideEndTop',
  }

  const markLine = annotationHorizontalLineList.flatMap((annotationHorizontalLine) => {
    const {
      selector: selectorPoint,
      yValue,
      text = '',
      textPosition = 'insideEnd',
      textColor = theme?.textColor ?? '#ffffff',
      textFontSize = theme?.textFontSize ?? 12,
      textFontWeight = theme?.textFontWeight ?? 400,
      textAlign = 'right',
      textBaseline = 'bottom',

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
    } = annotationHorizontalLine

    const dataset = advancedVSeed.dataset.flat()

    const generateOneMarkLine = (y: string | number) => {
      return {
        y,
        autoRange: true,
        zIndex: ANNOTATION_Z_INDEX,
        line: {
          style: {
            visible: lineVisible,
            stroke: lineColor,
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
            visible: true,
            dy: 4,
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
              dy: 4,
              cornerRadius: textBackgroundBorderRadius,
              fill: textBackgroundColor,
              stroke: textBackgroundBorderColor,
              lineWidth: textBackgroundBorderWidth,
              fillOpacity: 1,
            },
          },
        },
        startSymbol: {
          visible: theme?.startSymbolVisible ?? true,
          symbolType: theme?.startSymbolType ?? 'triangleDown',
          size: 5 + (lineWidth || 1),
          style: {
            dx: 3,
            fill: lineColor,
          },
        },
        endSymbol: {
          visible: theme?.endSymbolVisible ?? false,
          symbolType: theme?.endSymbolType ?? 'arrow',
          size: 10 + (lineWidth || 1),
          style: {
            dx: -4,
            fill: lineColor,
          },
        },
      }
    }
    if ((!selectorPoint && isArray(yValue)) || isString(yValue) || isNumber(yValue)) {
      const yValueArr = Array.isArray(yValue) ? yValue : [yValue]
      return yValueArr.map(generateOneMarkLine)
    }

    const selectedData = selectorPoint ? dataset.filter((datum) => selector(datum, selectorPoint)) : []

    return selectedData.map((datum) => {
      if (datum[unfoldInfo.encodingY]) {
        return generateOneMarkLine(datum[unfoldInfo.encodingY] as string)
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
