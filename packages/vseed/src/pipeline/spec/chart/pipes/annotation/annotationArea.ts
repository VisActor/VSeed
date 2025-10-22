import type { ICartesianSeries, ILineChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, SpecPipe } from 'src/types'
import { isSubset } from './utils'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'

export const annotationArea: SpecPipe = (spec, context) => {
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

  const markArea = annotationAreaList.flatMap((annotationArea) => {
    const {
      selector: selectorPoint,
      text = '',
      textPosition = 'top',
      textColor = theme?.textColor ?? '#ffffff',
      textFontSize = theme?.textFontSize ?? 12,
      textFontWeight = theme?.textFontWeight ?? 400,
      textAlign = 'center',
      textBaseline = 'top',

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

    const dataset = advancedVSeed.dataset.flat()
    const selectedData = selectorPoint ? dataset.filter((datum) => selector(datum, selectorPoint)) : []

    const labelPosition = positionMap[textPosition || 'top']
    const isBottom = labelPosition.toLocaleLowerCase().includes('bottom')

    return {
      zIndex: ANNOTATION_Z_INDEX,
      regionRelative: true,
      positions: (data: Datum[], context: ICartesianSeries) => {
        const positionData = data.filter((item) => selectedData.some((datum) => isSubset(datum, item)))
        const xyList = positionData.map((datum) => context.dataToPosition(datum) as { x: number; y: number })

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
          const yScale = yAxisHelper.getScale()

          const minX = Math.min(...xyList.map((item) => item.x)) - (outerPadding || 4)
          const maxX = Math.max(...xyList.map((item) => item.x)) + (outerPadding || 4)
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
          const xScale = xAxisHelper.getScale()

          const minY = Math.min(...xyList.map((item) => item.y)) - (outerPadding || 4)
          const maxY = Math.max(...xyList.map((item) => item.y)) + (outerPadding || 4)
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
        position: labelPosition,
        visible: true,
        text: text,
        style: {
          dy: isBottom ? -(textFontSize || 12) * 2 : 0,
          textAlign: textAlign,
          textBaseline: textBaseline,
          fill: textColor,
          stroke: textBackgroundColor,
          lineWidth: 1,
          fontSize: textFontSize,
          fontWeight: textFontWeight,
        },

        labelBackground: {
          visible: textBackgroundVisible,
          padding: textBackgroundPadding,
          style: {
            dy: isBottom ? -(textFontSize || 12) * 2 : 0,
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
