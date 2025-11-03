import type { ICartesianSeries, IChart, IHistogramChartSpec, IVChart } from '@visactor/vchart'
import type { KDEEvaluator, KDEOptions } from '@visactor/vutils'
import { isNullish, uniqueBy } from 'remeda'
import { ecdf, kde } from '@visactor/vutils'
import { BinEndMeasureId, BinStartMeasureId } from 'src/dataReshape'
import type { Datum, Dimension, HistogramRegressionLine, SpecPipe, Encoding } from 'src/types'

const getRegressionByType = (type: 'kde' | 'ecdf', data: number[], kdeOptions?: KDEOptions) => {
  switch (type) {
    case 'kde':
      return kde(data, kdeOptions)
    case 'ecdf':
      return ecdf(data)
  }
}

export const histogramRegressionLine: SpecPipe = (spec, context) => {
  const result = { ...spec } as IHistogramChartSpec
  const { advancedVSeed, vseed } = context
  const { chartType, encoding = {} as Encoding, dimensions, histogramRegressionLine } = advancedVSeed
  const { dataset } = vseed
  const theme = advancedVSeed.config[chartType as 'histogram']?.histogramRegressionLine as HistogramRegressionLine

  if (!histogramRegressionLine) {
    return result
  }

  const rowColumnFields = uniqueBy(
    dimensions.filter((dim: Dimension) => dim.encoding === 'row' || dim.encoding === 'column'),
    (item: Dimension) => item.id,
  )
  const lineList = Array.isArray(histogramRegressionLine) ? histogramRegressionLine : [histogramRegressionLine]

  if (!result.customMark) {
    result.customMark = []
  }

  lineList.forEach((line) => {
    const { color, type, lineWidth, lineDash, text, textColor, textFontSize, textFontWeight } =
      line as HistogramRegressionLine

    ;(result.customMark as any[]).push({
      type: 'line',
      interactive: false,
      zIndex: 500,
      style: {
        lineWidth: lineWidth ?? theme?.lineWidth,
        lineDash: lineDash ?? theme?.lineDash,
        stroke:
          color ??
          ((datum: Datum, ctx: any): string | undefined => {
            const vchart = ctx.vchart as IVChart
            const chart = vchart.getChart() as IChart
            const series = chart.getAllSeries().filter((s: any) => s.type === 'bar')

            return series.length
              ? series[0].getOption().globalScale.getScale('color')?.scale(series[0].getSeriesKeys()[0])
              : undefined
          }),
        points: (datum: any, ctx: any) => {
          const vchart = ctx.vchart as IVChart
          const chart = vchart.getChart() as IChart
          const series = chart.getAllSeries().filter((s: any) => s.type === 'bar')

          // 直方图使用的是bar系列
          if (series && series.length) {
            const s = series[0] as ICartesianSeries
            const region = s.getRegion().getLayoutStartPoint()

            const fieldX = s.fieldX?.[0]
            const scaleY = s.getYAxisHelper().getScale?.(0)
            const viewData = s.getViewData()?.latestData

            if (!dataset || !dataset.length || !viewData || !viewData.length || !scaleY) {
              return
            }
            const simpleData = dataset
              .filter((entry: Datum) => {
                return rowColumnFields.length
                  ? rowColumnFields.every((dim: Dimension) => {
                      return entry[dim.id] === viewData[0][dim.id]
                    })
                  : true
              })
              .map((d: Datum) => (d as any)[encoding.value?.[0] as string]) as number[]
            const res = getRegressionByType(
              type,
              simpleData,
              type === 'kde'
                ? ({
                    bandwidth: Math.abs(viewData[0][BinEndMeasureId] - viewData[0][BinStartMeasureId]),
                  } as KDEOptions)
                : undefined,
            )
            const N = Math.max(3, Math.floor(simpleData.length / 4))
            const lineData = res.evaluateGrid(N)
            const yRange = scaleY.range()
            const y0 = yRange[0]
            const y1 = yRange[yRange.length - 1]
            const scaleR =
              type === 'kde'
                ? (k: number) => {
                    return scaleY.scale(k * simpleData.length * (res as KDEEvaluator).bandwidth)
                  }
                : (e: number) => {
                    return y0 + (y1 - y0) * e
                  }

            //color: color ?? s.getOption().globalScale.getScale('color')?.scale(s.getSeriesKeys()[0]),

            return lineData.map((ld: Datum) => {
              const d = { [fieldX]: ld.x }
              return {
                x: s.dataToPositionX(d)! + region.x,
                y: scaleR(ld.y as number) + region.y,
              }
            })
          }
          return []
        },
      },
    })

    if (!isNullish(text)) {
      ;(result.customMark as any[]).push({
        type: 'text',
        interactive: false,
        zIndex: 500,
        style: {
          textAlign: 'end',
          fill: textColor ?? theme?.textColor,
          fontSize: textFontSize ?? theme?.textFontSize,
          fontWeight: textFontWeight ?? theme?.textFontWeight,
          text: text,
          x: (datum: any, ctx: any) => {
            const vchart = ctx.vchart as IVChart
            const chart = vchart.getChart() as IChart
            const series = chart.getAllSeries().filter((s: any) => s.type === 'bar')
            // 直方图使用的是bar系列
            if (series && series.length) {
              const s = series[0] as ICartesianSeries
              const startPoint = s.getRegion().getLayoutStartPoint()

              const fieldX = s.fieldX[0]
              const fieldX2 = s.fieldX2
              const scaleY = s.getYAxisHelper().getScale?.(0)
              const viewData = s.getViewData()?.latestData
              if (!dataset || !dataset.length || !viewData || !viewData.length || !scaleY) {
                return undefined
              }
              const maxX = Math.max.apply(
                null,
                (viewData as any[]).map((d: Datum) =>
                  Math.max((d as any)[fieldX] as number, (d as any)[fieldX2] as number),
                ),
              )
              return startPoint.x + s.dataToPositionX({ [fieldX]: maxX })!
            }

            return undefined
          },
          y: (datum: any, ctx: any) => {
            const vchart = ctx.vchart as IVChart
            const chart = vchart.getChart() as IChart
            const series = chart.getAllSeries().filter((s: any) => s.type === 'bar')
            // 直方图使用的是bar系列
            if (series && series.length) {
              const s = series[0] as ICartesianSeries
              const startPoint = s.getRegion().getLayoutStartPoint()

              const fieldY = s.fieldY[0]
              const viewData = s.getViewData()?.latestData
              if (!viewData || !viewData.length) {
                return undefined
              }
              return type === 'ecdf'
                ? startPoint.y + 12
                : startPoint.y + s.dataToPositionY({ [fieldY]: viewData[viewData.length - 1]?.[fieldY] })!
            }

            return undefined
          },
        },
      })
    }
  })

  return result
}
