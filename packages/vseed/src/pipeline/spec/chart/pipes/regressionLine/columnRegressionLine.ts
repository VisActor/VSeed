import type { IBarChartSpec, ICartesianSeries, IChart, IVChart } from '@visactor/vchart'
import { isNullish } from 'remeda'
import { array, clamper, regressionPolynomial } from '@visactor/vutils'
import type { Datum, SpecPipe, RegressionLineConfig, LinearRegressionLine, PolynomialRegressionLine } from 'src/types'
import { defaultRegressionLineColor, defaultRegressionLineLabelX } from './common'

export const columnPolynomialRegressionLine: SpecPipe = (spec, context): Partial<IBarChartSpec> => {
  const result = { ...spec } as Partial<IBarChartSpec>
  const { advancedVSeed } = context
  const { chartType, regressionLine } = advancedVSeed
  const lineTheme = advancedVSeed.config[chartType as 'scatter']?.regressionLine as RegressionLineConfig

  if (!regressionLine || !regressionLine.polynomialRegressionLine) {
    return result
  }

  const lineList = array(regressionLine.polynomialRegressionLine)

  if (!result.customMark) {
    result.customMark = []
  }

  lineList.forEach((line) => {
    const theme = (lineTheme.linearRegressionLine ?? {}) as LinearRegressionLine
    const {
      color,
      lineWidth,
      lineDash,
      text,
      textColor,
      textFontSize,
      textFontWeight,
      confidenceIntervalOpacity,
      confidenceIntervalVisible = theme.confidenceIntervalVisible,
    } = line as LinearRegressionLine

    if (confidenceIntervalVisible) {
      ;(result.customMark as any[]).push({
        type: 'area',
        interactive: false,
        zIndex: 500,
        style: {
          lineWidth: lineWidth ?? theme.lineWidth,
          lineDash: lineDash ?? theme.lineDash,
          fillOpacity: confidenceIntervalOpacity ?? theme.confidenceIntervalOpacity,
          fill: color ?? defaultRegressionLineColor,
          points: (datum: any, ctx: any) => {
            const vchart = ctx.vchart as IVChart
            const chart = vchart.getChart() as IChart
            const s = chart.getAllSeries()[0] as ICartesianSeries

            if (s) {
              const rect = s.getRegion().getLayoutRect()

              if (rect.width === 0 || rect.height === 0) {
                return []
              }

              const start = s.getRegion().getLayoutStartPoint()
              const yClamper = clamper(start.y, start.y + rect.height)
              const data = s.getViewData()?.latestData as Datum[]
              const fieldX = s.fieldX?.[0]
              const fieldY = s.fieldY?.[0]
              const xValues = s.getRawDataStatisticsByField(fieldX).values as string[]

              if (!fieldX || !fieldY || !data || data.length <= 2 || xValues.length <= 2) {
                return
              }

              // eslint-disable-next-line @typescript-eslint/unbound-method
              const { confidenceInterval } = regressionPolynomial(
                xValues.map((xVal, index: number) => {
                  const filteredData = data.filter((d) => d[fieldX] === xVal)

                  return {
                    x: index,
                    y: Math.max(...filteredData.map((d) => d[fieldY] as number)),
                  }
                }),
                undefined,
                undefined,
                {
                  degree: (line as PolynomialRegressionLine).degree ?? 2,
                },
              )
              const N = xValues.length
              const xAxisHelper = s.getXAxisHelper()
              const halfBandWidth = xAxisHelper ? xAxisHelper.getBandwidth!(0) / 2 : 0
              const intervalData = confidenceInterval(N)

              return intervalData.map((datum: Datum, index: number) => {
                const d = { [fieldX]: xValues[index], [fieldY]: datum.lower }
                return {
                  x: s.dataToPositionX(d)! + start.x + halfBandWidth,
                  y: yClamper(s.dataToPositionY(d)! + start.y),
                  y1: yClamper(s.dataToPositionY({ [fieldY]: datum.upper })! + start.y),
                }
              })
            }
            return []
          },
        },
      })
    }

    ;(result.customMark as any[]).push({
      type: 'line',
      interactive: false,
      zIndex: 500,
      style: {
        lineWidth: lineWidth ?? theme.lineWidth,
        lineDash: lineDash ?? theme.lineDash,
        stroke: color ?? defaultRegressionLineColor,
        points: (datum: any, ctx: any) => {
          const vchart = ctx.vchart as IVChart
          const chart = vchart.getChart() as IChart
          const s = chart.getAllSeries()[0] as ICartesianSeries

          if (s) {
            const rect = s.getRegion().getLayoutRect()

            if (rect.width === 0 || rect.height === 0) {
              return []
            }

            const start = s.getRegion().getLayoutStartPoint()
            const yClamper = clamper(start.y, start.y + rect.height)
            const data = s.getViewData()?.latestData as Datum[]
            const fieldX = s.fieldX?.[0]
            const fieldY = s.fieldY?.[0]
            const xValues = s.getRawDataStatisticsByField(fieldX).values as string[]

            if (!fieldX || !fieldY || !data || data.length <= 2 || xValues.length <= 2) {
              return
            }

            // eslint-disable-next-line @typescript-eslint/unbound-method
            const { evaluateGrid } = regressionPolynomial(
              xValues.map((xVal, index: number) => {
                const filteredData = data.filter((d) => d[fieldX] === xVal)

                return {
                  x: index,
                  y: Math.max(...filteredData.map((d) => d[fieldY] as number)),
                }
              }),
              undefined,
              undefined,
              {
                degree: (line as PolynomialRegressionLine).degree ?? 2,
              },
            )
            const N = xValues.length
            const xAxisHelper = s.getXAxisHelper()
            const halfBandWidth = xAxisHelper ? xAxisHelper.getBandwidth!(0) / 2 : 0
            const lineData = evaluateGrid(N)

            return lineData.map((ld: Datum, index: number) => {
              const d = { [fieldX]: xValues[index], [fieldY]: ld.y }
              return {
                x: s.dataToPositionX(d)! + start.x + halfBandWidth,
                y: yClamper(s.dataToPositionY(d)! + start.y),
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
          fill: textColor ?? theme.textColor,
          fontSize: textFontSize ?? theme.textFontSize,
          fontWeight: textFontWeight ?? theme.textFontWeight,
          text: text,
          x: defaultRegressionLineLabelX,
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
              return startPoint.y + s.dataToPositionY({ [fieldY]: viewData[viewData.length - 1]?.[fieldY] })!
            }

            return undefined
          },
        },
      })
    }
  })

  return result
}
