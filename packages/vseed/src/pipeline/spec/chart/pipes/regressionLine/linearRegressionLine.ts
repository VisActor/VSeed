import type { ICartesianSeries, IChart, IScatterChartSpec, IVChart } from '@visactor/vchart'
import { isNullish } from 'remeda'
import {
  array,
  clamper,
  regressionLinear,
  regressionLowess,
  regressionPolynomial,
  regressionLogistic,
} from '@visactor/vutils'
import type {
  Datum,
  SpecPipe,
  RegressionLineConfig,
  LinearRegressionLine,
  SpecPipelineContext,
  PolynomialRegressionLine,
} from 'src/types'
import { defaultRegressionLineLabelX } from './common'

export const generateRegressionLinePipe = (
  type: 'linearRegressionLine' | 'lowessRegressionLine' | 'polynomialRegressionLine' | 'logisticRegressionLine',
  regressionFunction: (
    arr: Datum[],
    xAccessor: (d: Datum) => number,
    yAccessor: (d: Datum) => number,
    options?: any,
  ) => {
    confidenceInterval: (N: number) => { lower: number; upper: number; x: number }[]
    evaluateGrid: (N: number) => { x: number; y: number }[]
  },
  getOptions?: (lineConfig: any) => any,
): SpecPipe => {
  return ((spec: Partial<IScatterChartSpec>, context: SpecPipelineContext): Partial<IScatterChartSpec> => {
    const result = { ...spec }
    const { advancedVSeed } = context
    const { chartType, regressionLine } = advancedVSeed
    const lineTheme = advancedVSeed.config[chartType as 'scatter']?.regressionLine as RegressionLineConfig

    if (!regressionLine || !regressionLine[type]) {
      return result
    }

    const lineList = array(regressionLine[type])

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
            strokeOpacity: 0,
            fill: 'red', // vrender bug，必须要设置一个全局的fill，才会绘制
            segments: (datum: any, ctx: any) => {
              const vchart = ctx.vchart as IVChart
              const chart = vchart.getChart() as IChart
              const s = chart.getAllSeries()[0] as ICartesianSeries

              if (s) {
                const rect = s.getRegion().getLayoutRect()
                const segments: {
                  points: { x: number; y: number; y1: number }[]
                  fill: string
                }[] = []

                if (rect.width === 0 || rect.height === 0) {
                  return segments
                }

                const start = s.getRegion().getLayoutStartPoint()
                const yClamper = clamper(start.y, start.y + rect.height)
                const colorAttrOptions = s.getColorAttribute()
                const groups: (string | undefined)[] = s.getSeriesKeys()
                const data = s.getViewData()?.latestData as Datum[]
                const fieldX = s.fieldX?.[0]
                const fieldY = s.fieldY?.[0]

                if (!groups.length) {
                  groups.push(undefined)
                }

                groups.forEach((group) => {
                  const groupData = data.filter((d: Datum) => d[colorAttrOptions?.field] === group)

                  if (!groupData.length) {
                    return
                  }
                  const { confidenceInterval } = regressionFunction(
                    groupData,
                    (datum: Datum) => datum?.[fieldX],
                    (datum: Datum) => datum?.[fieldY],
                    getOptions?.(line),
                  )
                  const N = Math.max(3, Math.floor(groupData.length / 4))
                  const intervalData = confidenceInterval(N)
                  const mainColor = color ?? colorAttrOptions?.scale?.scale(group)

                  segments.push({
                    fill: mainColor,
                    points: intervalData.map((datum: Datum) => {
                      const d = { [fieldX]: datum.x, [fieldY]: datum.lower }
                      return {
                        x: s.dataToPositionX(d)! + start.x,
                        y: yClamper(s.dataToPositionY(d)! + start.y),
                        y1: yClamper(s.dataToPositionY({ [fieldY]: datum.upper })! + start.y),
                      }
                    }),
                  })
                })

                return segments
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
          fillOpacity: 0,
          stroke: 'red', // vrender bug，必须要设置一个全局的stroke，才会绘制
          segments: (datum: any, ctx: any) => {
            const vchart = ctx.vchart as IVChart
            const chart = vchart.getChart() as IChart
            const s = chart.getAllSeries()[0] as ICartesianSeries

            if (s) {
              const rect = s.getRegion().getLayoutRect()
              const segments: {
                points: { x: number; y: number }[]
                stroke: string
              }[] = []

              if (rect.width === 0 || rect.height === 0) {
                return segments
              }

              const start = s.getRegion().getLayoutStartPoint()
              const yClamper = clamper(start.y, start.y + rect.height)
              const colorAttrOptions = s.getColorAttribute()
              const groups: (string | undefined)[] = s.getSeriesKeys()
              const data = s.getViewData()?.latestData as Datum[]
              const fieldX = s.fieldX?.[0]
              const fieldY = s.fieldY?.[0]

              if (!groups.length) {
                groups.push(undefined)
              }

              groups.forEach((group) => {
                const groupData = data.filter((d: Datum) => d[colorAttrOptions?.field] === group)

                if (!groupData.length) {
                  return
                }
                const { evaluateGrid } = regressionFunction(
                  groupData,
                  (datum: Datum) => datum?.[fieldX],
                  (datum: Datum) => datum?.[fieldY],
                  getOptions?.(line),
                )
                const N = Math.max(3, Math.floor(groupData.length / 4))
                const lineData = evaluateGrid(N)
                const mainColor = color ?? colorAttrOptions?.scale?.scale(group)

                segments.push({
                  stroke: mainColor,
                  points: lineData.map((ld: Datum) => {
                    const d = { [fieldX]: ld.x, [fieldY]: ld.y }
                    return {
                      x: s.dataToPositionX(d)! + start.x,
                      y: yClamper(s.dataToPositionY(d)! + start.y),
                    }
                  }),
                })
              })

              return segments
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
  }) as SpecPipe
}

export const linearRegressionLine: SpecPipe = generateRegressionLinePipe('linearRegressionLine', regressionLinear)
export const lowessRegressionLine: SpecPipe = generateRegressionLinePipe('lowessRegressionLine', regressionLowess)
export const polynomialRegressionLine: SpecPipe = generateRegressionLinePipe(
  'polynomialRegressionLine',
  regressionPolynomial,
  (lineConfig: PolynomialRegressionLine) => {
    return { degree: lineConfig.degree ?? 2 }
  },
)
export const logisticRegressionLine: SpecPipe = generateRegressionLinePipe('logisticRegressionLine', regressionLogistic)
