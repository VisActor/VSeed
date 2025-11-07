import type { ICartesianSeries, IChart, ILineChartSpec, IVChart } from '@visactor/vchart'
import { array, Color as VUtilColor } from '@visactor/vutils'
import { isNullish, isNumber, isPlainObject } from 'remeda'
import type { AnnotationHorizontalLine, SpecPipe, Color } from 'src/types'

interface SplitConfig {
  points: { x: number; y: number }[]
  splitCoordinate: number
  lineStroke: {
    gradient: string
    x0: number
    x1: number
    y0: number
    y1: number
    stops: {
      color: string
      offset: number
    }[]
  }
  areaFill: {
    gradient: string
    x0: number
    x1: number
    y0: number
    y1: number
    stops: {
      color: string
      offset: number
    }[]
  }
}

export const splitLine: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { annotation, chartType, datasetReshapeInfo } = advancedVSeed

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
    zIndex: 300,
    style: {
      splitConfig: (datum: any, ctx: any) => {
        const vchart = ctx.vchart as IVChart
        const chart = vchart.getChart() as IChart
        const lineSeries = chart.getAllSeries().find((s) => s.type === 'line' || s.type === 'area') as ICartesianSeries

        if (!lineSeries) {
          return
        }
        const lineMark = lineSeries.getMarkInName('line') ?? lineSeries.getMarkInName('area')

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
        const lineStroke = {
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
        }
        const areaFill = {
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
        }
        const attrs: any = {
          segments: null,
          points,
        }

        if (lineGraphics[0].type === 'area') {
          attrs.stroke = lineStroke
          attrs.fill = areaFill
        } else {
          attrs.stroke = lineStroke
        }

        lineGraphics[0].setAttributes(attrs as unknown as Record<string, any>)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        lineGraphics[0].setFinalAttributes?.(attrs)
        const start = lineSeries.getRegion().getLayoutStartPoint()

        return {
          points: points.map((entry) => ({ x: entry.x + start.x, y: entry.y + start.y })),
          splitCoordinate,
          areaFill,
          lineStroke,
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
              const { areaFill } = parentNode.attribute.splitConfig as SplitConfig

              return areaFill
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

  const seriesSpec =
    result.type === 'line' || result.type === 'area'
      ? result
      : result.series?.find((s) => s.type === 'line' || s.type === 'area')

  if (seriesSpec) {
    if (!seriesSpec.point) {
      seriesSpec.point = {}
    }
    if (!seriesSpec.line) {
      seriesSpec.line = {}
    }

    if (!seriesSpec.point.style) {
      seriesSpec.point.style = {}
    }
    if (!seriesSpec.line.style) {
      seriesSpec.line.style = {}
    }

    const measureValueKey = datasetReshapeInfo[0].foldInfo.measureValue

    seriesSpec.point.style.fill = (datum) => {
      console.log(datum)
      return datum?.[measureValueKey] >= splitValue ? colorConfig.positiveColor : colorConfig.negativeColor
    }
    seriesSpec.line.style.stroke = (datum) => {
      return datum?.[measureValueKey] >= splitValue ? colorConfig.positiveColor : colorConfig.negativeColor
    }
    if (seriesSpec.label && (seriesSpec.label as any).visible && isNullish((seriesSpec.label as any).style?.fill)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ;(seriesSpec.label as any).style = {
        ...(seriesSpec.label as any).style,
        fill: (datum: any) => {
          return datum?.[measureValueKey] >= splitValue ? colorConfig.positiveColor : colorConfig.negativeColor
        },
      }
    }
  }

  return result
}
