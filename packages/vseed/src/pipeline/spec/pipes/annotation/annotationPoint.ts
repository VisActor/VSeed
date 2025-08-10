/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { ILineChartSpec } from '@visactor/vchart'
import { selector } from '../../../../dataSelector'
import type { Datum, SpecPipe } from 'src/types'

export const annotationPoint: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { annotation } = advancedVSeed

  if (!annotation || !annotation.annotationPoint) {
    return spec
  }

  const { annotationPoint } = annotation
  const annotationPointList = Array.isArray(annotationPoint) ? annotationPoint : [annotationPoint]

  const markPoint = annotationPointList.flatMap((annotationPoint) => {
    const {
      selector: selectorPoint,
      text = '',
      textColor = '#ffffff',
      textFontSize = 12,
      textFontWeight = 400,
      textAlign = 'center',
      textBaseline = 'middle',
      backgroundBorderColor,
      backgroundBorderRadius = 4,
      backgroundBorderWidth = 1,
      backgroundColor = '#212121',
      backgroundPadding = 4,
      backgroundVisible = true,
      offsetX = 0,
      offsetY = 0,
      // lineColor,
      // lineStyle,
      // lineVisible,
      // lineWidth,
    } = annotationPoint

    const dataset = advancedVSeed.dataset.flat()
    const selectedData = dataset.filter((datum) => selector(datum, selectorPoint))

    return selectedData.map((datum) => {
      return {
        regionRelative: true,
        position: (
          data: Datum[],
          context: {
            scaleX: any
            scaleY: any
            dataToPosition: (datum: Datum) => { x: number; y: number }
          },
        ) => {
          const targetDatum = data.find((item) => isSubset(datum, item))
          if (targetDatum) {
            const { x, y } = context.dataToPosition(targetDatum) as { x: number; y: number }
            const xBandWidth = context.scaleX?.bandwidth?.() as number
            const yBandWidth = context.scaleY?.bandwidth?.() as number
            if (xBandWidth) {
              return {
                x: x,
                y: y,
              }
            }
            if (yBandWidth) {
              return {
                x,
                y: y,
              }
            }
          }
        },

        itemLine: {
          visible: false,
        },
        itemContent: {
          offsetY,
          offsetX,
          text: {
            visible: true,
            text: text,
            style: {
              textAlign: textAlign,
              textBaseline: textBaseline,
              fill: textColor,
              fontSize: textFontSize,
              fontWeight: textFontWeight,
            },
            labelBackground: {
              visible: backgroundVisible,
              padding: backgroundPadding,
              style: {
                cornerRadius: backgroundBorderRadius ?? 4,
                fill: backgroundColor,
                stroke: backgroundBorderColor,
                strokeWidth: backgroundBorderWidth,
              },
            },
          },
        },
      }
    })
  }) as ILineChartSpec['markPoint']

  return {
    ...spec,
    markPoint,
  }
}

const isSubset = (sub: Datum, obj: Datum) => {
  return Object.entries(sub).every(([key, value]) => {
    if (typeof value === 'string') {
      return obj[key] === value
    }
    if (typeof value === 'number') {
      return obj[key] === value
    }
    return true
  })
}
