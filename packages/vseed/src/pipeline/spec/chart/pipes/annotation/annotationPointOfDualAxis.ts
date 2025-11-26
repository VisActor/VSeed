import type { ILineChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, VChartSpecPipe, VSeed } from 'src/types'
import { isSubset } from './utils'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'
import { isBarLikeChart } from 'src/pipeline/utils/chatType'
import { findAllMeasures } from 'src/pipeline/utils'
import { MeasureId } from 'src/dataReshape/constant'
import { pickWithout } from '@visactor/vutils'

export const annotationPointOfDualAxis: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { annotation, config } = advancedVSeed

  if (!annotation || !annotation.annotationPoint) {
    return spec
  }

  const theme = config?.[vseed.chartType as 'column']?.annotation?.annotationPoint
  const { annotationPoint } = annotation
  const annotationPointList = Array.isArray(annotationPoint) ? annotationPoint : [annotationPoint]
  const isHorizontalBar = isBarLikeChart(advancedVSeed as VSeed)
  const defaultStyle = isHorizontalBar
    ? {
        textAlign: 'right',
        textBaseline: 'middle',
      }
    : {
        textAlign: 'center',
        textBaseline: 'top',
      }
  const allMeasureIds = findAllMeasures(advancedVSeed.reshapeMeasures ?? advancedVSeed.measures).map((m) => m.id)

  const markPoint = annotationPointList.flatMap((annotationPoint) => {
    const {
      selector: selectorPoint,
      text = '',
      textColor = theme?.textColor ?? '#ffffff',
      textFontSize = theme?.textFontSize ?? 12,
      textFontWeight = theme?.textFontWeight ?? 400,
      textAlign = defaultStyle.textAlign,
      textBaseline = defaultStyle.textBaseline,
      textBackgroundBorderColor = theme?.textBackgroundBorderColor,
      textBackgroundBorderRadius = theme?.textBackgroundBorderRadius ?? 4,
      textBackgroundBorderWidth = theme?.textBackgroundBorderWidth ?? 1,
      textBackgroundColor = theme?.textBackgroundColor ?? '#212121',
      textBackgroundPadding = theme?.textBackgroundPadding ?? 2,
      textBackgroundVisible = theme?.textBackgroundVisible ?? true,
      offsetX = theme?.offsetX ?? 0,
      offsetY = theme?.offsetY ?? 0,
    } = annotationPoint

    const dataset = advancedVSeed.dataset.flat()
    const selectedData = selectorPoint
      ? dataset.reduce((res: Datum[], d: Datum) => {
          const pickedDatum = pickWithout(
            d,
            allMeasureIds.filter((id) => id !== d[MeasureId]),
          )

          if (selector(pickedDatum, selectorPoint)) {
            res.push(pickedDatum)
          }

          return res
        }, [])
      : []

    const dx = -10 - (isHorizontalBar ? (textFontSize as number) : 0) // 由于vchart tag实现问题，需要设置这个强制偏移量
    const dy = isHorizontalBar ? 0 : (textFontSize as number)
    const baseConfig = {
      zIndex: ANNOTATION_Z_INDEX,
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
            opacity: 0.95,
            visible: true,
            textAlign: textAlign,
            textBaseline: textBaseline,
            fill: textColor,
            stroke: textBackgroundColor,
            lineWidth: 1,
            fontSize: textFontSize,
            fontWeight: textFontWeight,
            dx,
            dy,
          },
          labelBackground: {
            visible: textBackgroundVisible,
            padding: textBackgroundPadding,
            style: {
              opacity: 0.95,
              cornerRadius: textBackgroundBorderRadius ?? 4,
              fill: textBackgroundColor,
              stroke: textBackgroundBorderColor,
              lineWidth: textBackgroundBorderWidth,
              dx,
              dy,
            },
          },
        },
      },
    }

    return spec.series?.reduce((res: any[], s: any, index: number) => {
      selectedData.forEach((datum: Datum) => {
        res.push({
          ...baseConfig,
          relativeSeriesIndex: index,
          coordinate: (data: Datum[]) => {
            return data.find((item) => {
              return isSubset(
                datum,
                item,
                allMeasureIds.filter((id) => id !== item[MeasureId]),
              )
            })
          },
        })
      })

      return res
    }, [] as any[])
  }) as ILineChartSpec['markPoint']

  return {
    ...spec,
    markPoint,
  }
}
