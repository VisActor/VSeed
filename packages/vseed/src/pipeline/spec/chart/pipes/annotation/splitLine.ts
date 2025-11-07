import type { ICartesianSeries, IChart, ILineChartSpec, IVChart } from '@visactor/vchart'
import { array, Color as VUtilColor } from '@visactor/vutils'
import { isNumber, isPlainObject } from 'remeda'
import { FoldMeasureValue } from 'src/dataReshape/constant'
import type { AnnotationHorizontalLine, SpecPipe, Color } from 'src/types'

interface SplitConfig {
  points: { x: number; y: number }[]
  splitCoordinate: number
  fill: {
    gradient: string
    x0: number
    x1: number
    y0: number
    y1: number
    stops: {
      color: string
      offset: number
      opacity?: number
    }[]
  }
}

export const splitLine: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { annotation, chartType } = advancedVSeed

  if (!annotation || !annotation.annotationHorizontalLine) {
    return spec
  }
  const baseConfig = advancedVSeed.config[chartType] as { color: Color }

  const splitLineConfig = array(annotation.annotationHorizontalLine).find(
    (item) => !!(item as AnnotationHorizontalLine).splitLine,
  ) as AnnotationHorizontalLine | undefined

  const splitValue = +(splitLineConfig?.yValue as number | string)

  if (Number.isNaN(splitValue) || !isNumber(splitValue)) {
    return spec
  }
  const result = { ...spec } as Partial<ILineChartSpec>
  const colorTheme = baseConfig?.color ?? {}
  const colorConfig = {
    positiveColor: colorTheme.positiveColor || 'red',
    negativeColor: colorTheme.negativeColor || 'green',
    ...(isPlainObject(splitLineConfig?.splitLine) ? splitLineConfig?.splitLine : {}),
  }

  const groupMark = {
    type: 'group',
    name: 'annotationHorizontalLine-splitLine',
    zIndex: 500,
    style: {
      splitConfig: (datum: any, ctx: any) => {
        const vchart = ctx.vchart as IVChart
        const chart = vchart.getChart() as IChart
        const lineSeries = chart.getAllSeries().find((s) => s.type === 'line') as ICartesianSeries

        if (!lineSeries) {
          return
        }
        const lineMark = lineSeries.getMarkInName('line')

        if (!lineMark) {
          return
        }
        const lineGraphics = lineMark.getGraphics()

        if (!lineGraphics || lineGraphics.length !== 1 || !lineGraphics[0]) {
          return
        }
        const points = ((lineGraphics[0].attribute as any).points ?? []) as { x: number; y: number }[]

        if ((lineGraphics[0].attribute as any).segments?.length) {
          ;((lineGraphics[0].attribute as any).segments as any[]).forEach(
            (seg: { points: { x: number; y: number }[] }) => {
              seg.points.forEach((pt: { x: number; y: number }) => {
                points.push({ x: pt.x, y: pt.y })
              })
            },
          )
        }

        if (!points || !points.length) {
          return
        }
        const splitCoordinate = lineSeries.getYAxisHelper().getScale!(0).scale(splitValue)
        const minY = Math.min(...points.map((p) => p.y))
        const maxY = Math.max(...points.map((p) => p.y))
        const ratio = (splitCoordinate - minY) / (maxY - minY)
        const attrs = {
          segments: null,
          points,
          stroke: {
            gradient: 'linear',
            x0: 0,
            x1: 0,
            y0: 0,
            y1: 1,
            stops: [
              {
                color: colorConfig.positiveColor,
                offset: 0,
              },
              {
                color: colorConfig.positiveColor,
                offset: ratio,
              },
              {
                color: colorConfig.negativeColor,
                offset: ratio + 0.0000001,
              },
              {
                color: colorConfig.negativeColor,
                offset: 1,
              },
            ],
          },
        }

        lineGraphics[0].setAttributes(attrs as unknown as Record<string, any>)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        lineGraphics[0].setFinalAttributes?.(attrs)
        const start = lineSeries.getRegion().getLayoutStartPoint()

        return {
          points: points.map((entry) => ({ x: entry.x + start.x, y: entry.y + start.y })),
          splitCoordinate,
          fill: {
            gradient: 'linear',
            x0: 0,
            x1: 0,
            y0: 0,
            y1: 1,
            stops: [
              {
                color: colorConfig.positiveColor,
                offset: 0,
              },
              {
                color: new VUtilColor(colorConfig.positiveColor).setOpacity(0).toRGBA(),
                offset: ratio,
              },
              {
                offset: ratio + 0.0000001,
                color: new VUtilColor(colorConfig.negativeColor).setOpacity(0).toRGBA(),
              },
              {
                color: colorConfig.negativeColor,
                offset: 1,
              },
            ],
          },
        } as SplitConfig
      },
    },
    children: [
      {
        type: 'area',
        interactive: false,
        zIndex: 500,
        style: {
          fillOpacity: 0.5,
          points: (datum: any, ctx: any, opt: any) => {
            const parentNode = opt.mark?._product?.parent

            if (parentNode?.attribute?.splitConfig) {
              const { points, splitCoordinate } = parentNode.attribute.splitConfig as SplitConfig

              return points.map((entry: { x: number; y: number }) => {
                return {
                  ...entry,
                  y1: splitCoordinate,
                }
              })
            }

            return []
          },
          fill: (datum: any, ctx: any, opt: any) => {
            const parentNode = opt.mark?._product?.parent

            if (parentNode?.attribute?.splitConfig) {
              const { fill } = parentNode.attribute.splitConfig as SplitConfig

              return fill
            }

            return
          },
        },
      },
    ],
  }

  if (!result.customMark) {
    result.customMark = []
  }

  ;(result.customMark as any[]).push(groupMark)

  if (result.type === 'line') {
    if (!result.point) {
      result.point = {}
    }
    if (!result.line) {
      result.line = {}
    }

    if (!result.point.style) {
      result.point.style = {}
    }
    if (!result.line.style) {
      result.line.style = {}
    }

    result.point.style.fill = (datum) => {
      return datum?.[FoldMeasureValue] >= splitValue ? colorConfig.positiveColor : colorConfig.negativeColor
    }
    result.line.style.stroke = (datum) => {
      return datum?.[FoldMeasureValue] >= splitValue ? colorConfig.positiveColor : colorConfig.negativeColor
    }
  }

  return result
}
