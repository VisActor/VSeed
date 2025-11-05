import type { IBarChartSpec, ICartesianSeries, IChart, IVChart } from '@visactor/vchart'
import { isNullish } from 'remeda'
import { array, clamper, regressionPolynomial } from '@visactor/vutils'
import type { Datum, SpecPipe, RegressionLineConfig, LinearRegressionLine, PolynomialRegressionLine } from 'src/types'
import { defaultRegressionLineColor } from './common'

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

  lineList.forEach((line, lineIndex) => {
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

    const childrenMarks: any[] = []

    ;(result.customMark as any[]).push({
      type: 'group',
      interactive: false,
      zIndex: 500,
      name: `polynomialRegressionLine-${lineIndex}`,
      style: {
        data: (datum: any, ctx: any) => {
          const vchart = ctx.vchart as IVChart
          const chart = vchart.getChart() as IChart
          const s = chart.getAllSeries()[0] as ICartesianSeries

          if (s) {
            const rect = s.getRegion().getLayoutRect()

            if (rect.width === 0 || rect.height === 0) {
              return null
            }

            const start = s.getRegion().getLayoutStartPoint()
            const yClamper = clamper(start.y, start.y + rect.height)
            const data = s.getViewData()?.latestData as Datum[]
            const fieldX = s.fieldX?.[0]
            const fieldY = s.fieldY?.[0]
            const xValues = s.getRawDataStatisticsByField(fieldX).values as string[]

            if (!fieldX || !fieldY || !data || data.length <= 2 || xValues.length <= 2) {
              return null
            }

            // eslint-disable-next-line @typescript-eslint/unbound-method
            const { confidenceInterval, evaluateGrid } = regressionPolynomial(
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
            const linePoints = lineData.map((datum: Datum, index: number) => {
              const d = { [fieldX]: xValues[index], [fieldY]: datum.y }
              return {
                x: s.dataToPositionX(d)! + start.x + halfBandWidth,
                y: yClamper(s.dataToPositionY(d)! + start.y),
              }
            })
            const result: {
              linePoints: { x: number; y: number }[]
              areaPoints?: { x: number; y: number; y1: number }[]
              color: string
            } = {
              linePoints,
              color: s.getOption().globalScale.getScale('color')?.scale(s.getSeriesKeys()[0]),
            }

            if (confidenceIntervalVisible) {
              const intervalData = confidenceInterval(N)

              result.areaPoints = intervalData.map((datum: Datum, index: number) => {
                const d = { [fieldX]: xValues[index], [fieldY]: datum.lower }
                return {
                  x: s.dataToPositionX(d)! + start.x + halfBandWidth,
                  y: yClamper(s.dataToPositionY(d)! + start.y),
                  y1: yClamper(s.dataToPositionY({ [fieldY]: datum.upper })! + start.y),
                }
              })
            }

            return result
          }
          return null
        },
      },
      children: childrenMarks,
    })

    if (confidenceIntervalVisible) {
      childrenMarks.push({
        type: 'area',
        interactive: false,
        zIndex: 500,
        style: {
          lineWidth: lineWidth ?? theme.lineWidth,
          lineDash: lineDash ?? theme.lineDash,
          fillOpacity: confidenceIntervalOpacity ?? theme.confidenceIntervalOpacity,
          fill: color ?? defaultRegressionLineColor,
          points: (datum: any, ctx: any, opt: any) => {
            const parentNode = opt.mark?._product?.parent

            if (parentNode?.attribute?.data) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return parentNode.attribute.data.areaPoints
            }

            return []
          },
        },
      })
    }

    childrenMarks.push({
      type: 'line',
      interactive: false,
      zIndex: 500,
      style: {
        lineWidth: lineWidth ?? theme.lineWidth,
        lineDash: lineDash ?? theme.lineDash,
        stroke: color ?? defaultRegressionLineColor,
        points: (datum: any, ctx: any, opt: any) => {
          const parentNode = opt.mark?._product?.parent

          if (parentNode?.attribute?.data) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return parentNode.attribute.data.linePoints
          }

          return []
        },
      },
    })

    if (!isNullish(text)) {
      childrenMarks.push({
        type: 'text',
        interactive: false,
        zIndex: 500,
        style: {
          textAlign: 'end',
          fill: textColor ?? theme.textColor,
          fontSize: textFontSize ?? theme.textFontSize,
          fontWeight: textFontWeight ?? theme.textFontWeight,
          text: text,
          x: (datum: any, ctx: any, opt: any) => {
            const parentNode = opt.mark?._product?.parent

            if (parentNode?.attribute?.data?.linePoints) {
              const points = parentNode.attribute.data.linePoints
              return points[points.length - 1]?.x
            }

            return undefined
          },
          y: (datum: any, ctx: any, opt: any) => {
            const parentNode = opt.mark?._product?.parent

            if (parentNode?.attribute?.data?.linePoints) {
              const points = parentNode.attribute.data.linePoints
              return points[points.length - 1]?.y
            }

            return undefined
          },
        },
      })
    }
  })

  return result
}
