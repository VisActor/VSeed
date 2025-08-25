import type { ICartesianSeries, ILineChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, SpecPipe } from 'src/types'
import { isSubset } from './utils'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'

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
      textBaseline = 'top',
      backgroundBorderColor,
      backgroundBorderRadius = 4,
      backgroundBorderWidth = 1,
      backgroundColor = '#212121',
      backgroundPadding = 2,
      backgroundVisible = true,
      offsetX = 0,
      offsetY = 0,
    } = annotationPoint

    const dataset = advancedVSeed.dataset.flat()
    const selectedData = selectorPoint ? dataset.filter((datum) => selector(datum, selectorPoint)) : []

    return selectedData.map((datum) => {
      return {
        zIndex: ANNOTATION_Z_INDEX,
        regionRelative: true,
        position: (data: Datum[], context: ICartesianSeries) => {
          const targetDatum = data.find((item) => isSubset(datum, item))
          if (targetDatum) {
            const { x, y } = context.dataToPosition(targetDatum) as { x: number; y: number }
            return {
              x,
              y,
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
            text: text,
            style: {
              visible: true,
              textAlign: textAlign,
              textBaseline: textBaseline,
              fill: textColor,
              stroke: backgroundColor,
              lineWidth: 1,
              fontSize: textFontSize,
              fontWeight: textFontWeight,
              dy: textFontSize,
            },
            labelBackground: {
              visible: backgroundVisible,
              padding: backgroundPadding,
              style: {
                cornerRadius: backgroundBorderRadius ?? 4,
                fill: backgroundColor,
                stroke: backgroundBorderColor,
                lineWidth: backgroundBorderWidth,
                dy: textFontSize,
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
