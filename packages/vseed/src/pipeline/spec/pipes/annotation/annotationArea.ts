import type { ICartesianSeries, ILineChartSpec } from '@visactor/vchart'
import { selector } from '../../../../dataSelector'
import type { Datum, SpecPipe } from 'src/types'
import { isSubset } from './utils'

export const annotationArea: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { annotation } = advancedVSeed

  if (!annotation || !annotation.annotationArea) {
    return spec
  }

  const { annotationArea } = annotation
  const annotationAreaList = Array.isArray(annotationArea) ? annotationArea : [annotationArea]

  const positionMap = {
    top: 'insideTop',
    topRight: 'insideTopRight',
    topLeft: 'insideTopLeft',
    bottom: 'insideBottom',
    bottomLeft: 'insideBottomLeft',
    bottomRight: 'insideBottomRight',
    left: 'insideLeft',
    right: 'insideRight',
  }

  const markArea = annotationAreaList.flatMap((annotationArea) => {
    const {
      selector: selectorPoint,
      text = '',
      textPosition = 'top',
      textColor = '#ffffff',
      textFontSize = 12,
      textFontWeight = 400,
      textAlign = 'center',
      textBaseline = 'top',
      backgroundBorderColor,
      backgroundBorderRadius = 4,
      backgroundBorderWidth = 1,
      backgroundColor = '#191d24',
      backgroundPadding = 4,
      backgroundVisible = true,
      outerPadding = 0,
      areaColor = '#888888',
      areaColorOpacity = 0.15,
      areaBorderColor,
      areaBorderRadius,
      areaBorderWidth,
    } = annotationArea

    const dataset = advancedVSeed.dataset.flat()
    const selectedData = dataset.filter((datum) => selector(datum, selectorPoint))

    return {
      regionRelative: true,
      positions: (data: Datum[], context: ICartesianSeries) => {
        console.log('debug selectedData', selectedData)
        const positionData = data.filter((item) => selectedData.some((datum) => isSubset(datum, item)))
        const xyList = positionData.map((datum) => context.dataToPosition(datum) as { x: number; y: number })

        const xScale = context.scaleX as unknown as { bandwidth: () => number; range: () => number[] }
        const yScale = context.scaleY as unknown as { bandwidth: () => number; range: () => number[] }
        const xBandWidth = xScale?.bandwidth?.()
        const yBandWidth = yScale?.bandwidth?.()

        if (xBandWidth) {
          const minX = Math.min(...xyList.map((item) => item.x)) - outerPadding
          const maxX = Math.max(...xyList.map((item) => item.x)) + outerPadding
          const minY = Math.min(...yScale.range())
          const maxY = Math.max(...yScale.range())
          return [
            // 左上
            {
              x: minX,
              y: minY,
            },
            // 右上
            {
              x: maxX,
              y: minY,
            },
            // 右下
            {
              x: maxX,
              y: maxY,
            },
            // 左下
            {
              x: minX,
              y: maxY,
            },
          ]
        }

        if (yBandWidth) {
          const minY = Math.min(...xyList.map((item) => item.y)) - outerPadding
          const maxY = Math.max(...xyList.map((item) => item.y)) + outerPadding
          const minX = Math.min(...xScale.range())
          const maxX = Math.max(...xScale.range())

          return [
            // 左上
            {
              x: minX,
              y: minY,
            },
            // 右上
            {
              x: maxX,
              y: minY,
            },
            // 右下
            {
              x: maxX,
              y: maxY,
            },
            // 左下
            {
              x: minX,
              y: maxY,
            },
          ]
        }

        return []
      },

      label: {
        position: positionMap[textPosition],
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
      area: {
        style: {
          visible: true,
          fill: areaColor,
          fillOpacity: areaColorOpacity,
          stroke: areaBorderColor,
          strokeWidth: areaBorderWidth,
          cornerRadius: areaBorderRadius,
        },
      },
    }
  }) as ILineChartSpec['markArea']

  return {
    ...spec,
    markArea: markArea,
  }
}
