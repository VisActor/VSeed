import type { ICartesianSeries, ILineChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, SpecPipe } from 'src/types'
import { isSubset } from './utils'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'
import { isBarLikeChart } from 'src/pipeline/utils/chatType'

export const annotationAreaBand: SpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { annotation, config } = advancedVSeed

  if (!annotation || !annotation.annotationArea) {
    return spec
  }
  const theme = config?.[vseed.chartType as 'column']?.annotation?.annotationArea
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
  const defaultOptions = isBarLikeChart(advancedVSeed)
    ? {
        textPosition: 'right',
        textAlign: 'right',
      }
    : {
        textPosition: 'top',
        textAlign: 'center',
      }

  const markArea = annotationAreaList.flatMap((annotationArea) => {
    const {
      selector: selectorPoint,
      text = '',
      textColor = theme?.textColor ?? '#ffffff',
      textFontSize = theme?.textFontSize ?? 12,
      textFontWeight = theme?.textFontWeight ?? 400,
      textAlign = defaultOptions.textAlign,
      textBaseline = 'middle',

      textBackgroundVisible = theme?.textBackgroundVisible ?? true,
      textBackgroundColor = theme?.textBackgroundColor ?? '#191d24',
      textBackgroundBorderColor = theme?.textBackgroundBorderColor ?? '#191d24',
      textBackgroundBorderWidth = theme?.textBackgroundBorderWidth ?? 1,
      textBackgroundBorderRadius = theme?.textBackgroundBorderRadius ?? 4,
      textBackgroundPadding = theme?.textBackgroundPadding ?? 4,

      areaColor = theme?.areaColor ?? '#888888',
      areaColorOpacity = theme?.areaColorOpacity ?? 0.15,
      areaBorderColor = theme?.areaBorderColor ?? '#888888',
      areaBorderRadius = theme?.areaBorderRadius ?? 4,
      areaBorderWidth = theme?.areaBorderWidth ?? 1,
      areaLineDash = theme?.areaLineDash,

      outerPadding = theme?.outerPadding ?? 4,
    } = annotationArea
    const textPosition: string = annotationArea.textPosition ?? defaultOptions.textPosition

    const dy = textPosition.includes('bottom') ? -1 * textFontSize! : 0

    const dataset = advancedVSeed.dataset.flat()
    const selectedData = selectorPoint ? dataset.filter((datum) => selector(datum, selectorPoint)) : []

    return {
      zIndex: ANNOTATION_Z_INDEX,
      regionRelative: true,
      positions: (data: Datum[], context: ICartesianSeries & { _scaleConfig?: { bandPosition?: number } }) => {
        const positionData = data.filter((item) => selectedData.some((datum) => isSubset(datum, item)))
        const xyList = positionData.map((datum) => context.dataToPosition(datum) as { x: number; y: number })

        const bandPosition = context?._scaleConfig?.bandPosition || 0

        const yAxisHelper = context.getYAxisHelper() as unknown as {
          getBandwidth: (depth?: number) => number
          getScale: () => {
            range: () => number[]
          }
        }
        const xAxisHelper = context.getXAxisHelper() as unknown as {
          getBandwidth: (depth?: number) => number
          getScale: () => {
            range: () => number[]
          }
        }

        if (typeof xAxisHelper?.getBandwidth === 'function') {
          const depth = context.fieldX.length ?? 0
          const xBandWidth = xAxisHelper?.getBandwidth?.(depth - 1)
          const yScale = yAxisHelper.getScale()
          const startX = Math.min(...xyList.map((item) => item.x)) - (outerPadding || 4)
          const endX = Math.max(...xyList.map((item) => item.x)) + (outerPadding || 4)

          const width = endX - startX + xBandWidth
          const middleX = (endX + startX) / 2 + xBandWidth * (0.5 - bandPosition)

          const minX = middleX - width / 2
          const maxX = middleX + width / 2

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

        if (typeof yAxisHelper?.getBandwidth === 'function') {
          const depth = context.fieldY.length ?? 0
          const yBandWidth = yAxisHelper?.getBandwidth?.(depth - 1)
          const xScale = xAxisHelper.getScale()

          const startY = Math.min(...xyList.map((item) => item.y)) - (outerPadding || 4)
          const endY = Math.max(...xyList.map((item) => item.y)) + (outerPadding || 4)
          const width = endY - startY + yBandWidth
          const middleY = (endY + startY) / 2 + yBandWidth * (0.5 - bandPosition)

          const minY = middleY - width / 2
          const maxY = middleY + width / 2

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
        position: positionMap[textPosition as 'bottom'],
        visible: true,
        text: text,
        style: {
          dy: dy,
          textAlign: textAlign,
          textBaseline: textBaseline,
          stroke: textBackgroundColor,
          lineWidth: 1,
          fill: textColor,
          fontSize: textFontSize,
          fontWeight: textFontWeight,
        },

        labelBackground: {
          visible: textBackgroundVisible,
          padding: textBackgroundPadding,
          style: {
            dy: dy,
            cornerRadius: textBackgroundBorderRadius ?? 4,
            fill: textBackgroundColor,
            stroke: textBackgroundBorderColor,
            lineWidth: textBackgroundBorderWidth,
            fillOpacity: 1,
          },
        },
      },
      area: {
        style: {
          visible: true,
          fill: areaColor,
          fillOpacity: areaColorOpacity,
          stroke: areaBorderColor,
          lineWidth: areaBorderWidth,
          cornerRadius: areaBorderRadius,
          lineDash: areaLineDash,
        },
      },
    }
  }) as ILineChartSpec['markArea']

  return {
    ...spec,
    markArea: markArea,
  }
}
