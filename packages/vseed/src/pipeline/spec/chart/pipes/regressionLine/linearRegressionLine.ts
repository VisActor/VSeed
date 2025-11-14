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
  VChartSpecPipe,
  RegressionLineConfig,
  LinearRegressionLine,
  PolynomialRegressionLine,
  SpecPipelineContext,
} from 'src/types'

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
): VChartSpecPipe => {
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
        name: `${type}-${lineIndex}`,
        style: {
          data: (datum: any, ctx: any) => {
            const vchart = ctx.vchart as IVChart
            const chart = vchart.getChart() as IChart
            const s = chart.getAllSeries()[0] as ICartesianSeries

            if (s) {
              const rect = s.getRegion().getLayoutRect()
              const segments: {
                areaPoints?: { x: number; y: number; y1: number }[]
                linePoints: { x: number; y: number }[]
                color: string
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
                const { confidenceInterval, evaluateGrid } = regressionFunction(
                  groupData,
                  (datum: Datum) => datum?.[fieldX],
                  (datum: Datum) => datum?.[fieldY],
                  getOptions?.(line),
                )
                const N = Math.max(3, Math.floor(groupData.length / 4))
                const mainColor = color ?? colorAttrOptions?.scale?.scale(group)

                const lineData = evaluateGrid(N)
                const linePoints = lineData.map((ld: Datum) => {
                  const d = { [fieldX]: ld.x, [fieldY]: ld.y }
                  return {
                    x: s.dataToPositionX(d)! + start.x,
                    y: yClamper(s.dataToPositionY(d)! + start.y),
                  }
                })

                segments.push({
                  color: mainColor,
                  linePoints,
                })

                if (confidenceIntervalVisible) {
                  const intervalData = confidenceInterval(N)
                  const areaPoints = intervalData.map((datum: Datum) => {
                    const d = { [fieldX]: datum.x, [fieldY]: datum.lower }
                    return {
                      x: s.dataToPositionX(d)! + start.x,
                      y: yClamper(s.dataToPositionY(d)! + start.y),
                      y1: yClamper(s.dataToPositionY({ [fieldY]: datum.upper })! + start.y),
                    }
                  })

                  segments[segments.length - 1].areaPoints = areaPoints
                }
              })

              return segments
            }
            return []
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
            fill: 'red', // vrender bug，必须要设置一个全局的fill，才会绘制
            segments: (datum: any, ctx: any, opt: any) => {
              const parentNode = opt.mark?._product?.parent

              if (parentNode?.attribute?.data?.length) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                return parentNode.attribute.data.map((d: any) => {
                  return {
                    points: d.areaPoints ?? [],
                    fill: d.color,
                  }
                })
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
          stroke: 'red', // vrender bug，必须要设置一个全局的stroke，才会绘制
          segments: (datum: any, ctx: any, opt: any) => {
            const parentNode = opt.mark?._product?.parent

            if (parentNode?.attribute?.data?.length) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
              return parentNode.attribute.data.map((d: any) => {
                return {
                  points: d.linePoints,
                  stroke: d.color,
                }
              })
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

              if (parentNode?.attribute?.data?.length) {
                const point = parentNode.attribute.data[parentNode.attribute.data.length - 1].linePoints
                return point[point.length - 1]?.x
              }

              return undefined
            },
            y: (datum: any, ctx: any, opt: any) => {
              const parentNode = opt.mark?._product?.parent

              if (parentNode?.attribute?.data?.length) {
                const point = parentNode.attribute.data[parentNode.attribute.data.length - 1].linePoints
                return point[point.length - 1]?.y
              }

              return undefined
            },
          },
        })
      }
    })

    return result
  }) as VChartSpecPipe
}

export const linearRegressionLine: VChartSpecPipe = generateRegressionLinePipe('linearRegressionLine', regressionLinear)
export const lowessRegressionLine: VChartSpecPipe = generateRegressionLinePipe('lowessRegressionLine', regressionLowess)
export const polynomialRegressionLine: VChartSpecPipe = generateRegressionLinePipe(
  'polynomialRegressionLine',
  regressionPolynomial,
  (lineConfig: PolynomialRegressionLine) => {
    return { degree: lineConfig.degree ?? 2 }
  },
)
export const logisticRegressionLine: VChartSpecPipe = generateRegressionLinePipe(
  'logisticRegressionLine',
  regressionLogistic,
)
