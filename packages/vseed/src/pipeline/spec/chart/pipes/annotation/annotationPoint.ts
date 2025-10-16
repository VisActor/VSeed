import type { ILineChartSpec } from '@visactor/vchart'
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
      textBackgroundBorderColor,
      textBackgroundBorderRadius = 4,
      textBackgroundBorderWidth = 1,
      textBackgroundColor = '#212121',
      textBackgroundPadding = 2,
      textBackgroundVisible = true,
      offsetX = 0,
      offsetY = 0,
    } = annotationPoint

    const dataset = advancedVSeed.dataset.flat()
    const selectedData = selectorPoint ? dataset.filter((datum) => selector(datum, selectorPoint)) : []

    return selectedData.map((datum) => {
      return {
        zIndex: ANNOTATION_Z_INDEX,
        regionRelative: true,
        coordinate: (data: Datum[]) => {
          return data.find((item) => isSubset(datum, item))
        },

        itemLine: {
          visible: false,
        },
        itemContent: {
          offsetY,
          offsetX,
          confine: true,
          text: {
            text: text,
            style: {
              visible: true,
              textAlign: textAlign,
              textBaseline: textBaseline,
              fill: textColor,
              stroke: textBackgroundColor,
              lineWidth: 1,
              fontSize: textFontSize,
              fontWeight: textFontWeight,
              dy: textFontSize,
            },
            labelBackground: {
              visible: textBackgroundVisible,
              padding: textBackgroundPadding,
              style: {
                cornerRadius: textBackgroundBorderRadius ?? 4,
                fill: textBackgroundColor,
                stroke: textBackgroundBorderColor,
                lineWidth: textBackgroundBorderWidth,
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
