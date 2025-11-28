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
  LogisticRegressionLine,
  LowessRegressionLine,
} from 'src/types'
import { getAlphaByConfidenceLevel } from './common'

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
  getOptions: (lineConfig: any) => any = getDefaultRegressionOptions,
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

    if (!result.extensionMark) {
      result.extensionMark = []
    }

    lineList.forEach((line, lineIndex) => {
      if (line.enable === false) {
        return
      }

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

      ;(result.extensionMark as any[]).push({
        type: 'group',
        interactive: false,
        zIndex: 500,
        name: `${type}-${lineIndex}`,
        layoutType: 'region-relative',
        dataId: (spec.data as any)?.id,
        animation: false,
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

              const yClamper = clamper(0, rect.height)
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

                if (groupData.length <= 2) {
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
                const linePoints: { x: number; y: number }[] = []

                lineData.forEach((ld: Datum, index: number) => {
                  const d = { [fieldX]: ld.x, [fieldY]: ld.y }
                  const x = s.dataToPositionX(d)!
                  const y = yClamper(s.dataToPositionY(d)!)

                  if (segments.length && index === 0) {
                    segments[segments.length - 1].linePoints.push({ x, y: NaN }) // 断开线段用的
                  }

                  linePoints.push({
                    x,
                    y,
                  })
                })

                const segment: {
                  color: string
                  linePoints: { x: number; y: number }[]
                  areaPoints?: { x: number; y: number; y1: number }[]
                } = {
                  color: mainColor,
                  linePoints,
                }

                if (confidenceIntervalVisible) {
                  const intervalData = confidenceInterval(N)
                  const areaPoints: { x: number; y: number; y1: number }[] = []

                  intervalData.map((datum: Datum, index: number) => {
                    const d = { [fieldX]: datum.x, [fieldY]: datum.lower }
                    const x = s.dataToPositionX(d)!
                    const y = yClamper(s.dataToPositionY(d)!)
                    const y1 = yClamper(s.dataToPositionY({ [fieldY]: datum.upper })!)

                    if (segments.length && index === 0) {
                      segments[segments.length - 1].areaPoints!.push({ x, y: NaN, y1: NaN }) // 断开线段用的
                    }

                    areaPoints.push({ x, y, y1 })
                  })

                  segment.areaPoints = areaPoints
                }

                segments.push(segment)
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
          dataId: (spec.data as any)?.id,
          style: {
            stroke: false,
            lineWidth: lineWidth ?? theme.lineWidth,
            lineDash: lineDash ?? theme.lineDash,
            fillOpacity: confidenceIntervalOpacity ?? theme.confidenceIntervalOpacity,
            fill: 'red', // vrender bug，必须要设置一个全局的fill，才会绘制
            segments: (datum: any, ctx: any, opt: any) => {
              const parentNode = opt.mark?._product?.parent

              if (parentNode) {
                const data = parentNode.finalAttribute?.data ?? parentNode.attribute?.data

                if (data?.length) {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                  return data.map((d: any) => {
                    return {
                      points: d.areaPoints ?? [],
                      fill: d.color,
                    }
                  })
                }
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
        animation: false,
        dataId: (spec.data as any)?.id,
        style: {
          lineWidth: lineWidth ?? theme.lineWidth,
          lineDash: lineDash ?? theme.lineDash,
          stroke: 'red', // vrender bug，必须要设置一个全局的stroke，才会绘制
          segments: (datum: any, ctx: any, opt: any) => {
            const parentNode = opt.mark?._product?.parent

            if (parentNode) {
              const data = parentNode.finalAttribute?.data ?? parentNode.attribute?.data
              if (data?.length) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
                return data.map((d: any) => {
                  return {
                    points: d.linePoints,
                    stroke: d.color,
                  }
                })
              }
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
          animation: false,
          dataId: (spec.data as any)?.id,
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

const getDefaultRegressionOptions = (
  lineConfig: PolynomialRegressionLine | LinearRegressionLine | LogisticRegressionLine | LowessRegressionLine,
) => {
  const alpha = getAlphaByConfidenceLevel(lineConfig?.confidenceLevel)
  return { alpha }
}

export const linearRegressionLine: VChartSpecPipe = generateRegressionLinePipe('linearRegressionLine', regressionLinear)
export const lowessRegressionLine: VChartSpecPipe = generateRegressionLinePipe('lowessRegressionLine', regressionLowess)
export const polynomialRegressionLine: VChartSpecPipe = generateRegressionLinePipe(
  'polynomialRegressionLine',
  regressionPolynomial,
  (lineConfig: PolynomialRegressionLine) => {
    return { ...getDefaultRegressionOptions(lineConfig), degree: lineConfig.degree ?? 2 }
  },
)
export const logisticRegressionLine: VChartSpecPipe = generateRegressionLinePipe(
  'logisticRegressionLine',
  regressionLogistic,
)
