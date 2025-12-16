import type { ICartesianSeries, IChart, IHistogramChartSpec, IVChart } from '@visactor/vchart'
import { isNullish, uniqueBy } from 'remeda'
import { ecdf, array, isArray } from '@visactor/vutils'
import type { Datum, Dimension, VChartSpecPipe, Encoding, RegressionLineConfig, EcdfRegressionLine } from 'src/types'
import { defaultRegressionLineColor, defaultRegressionLineLabelX, defaultRegressionLineLabelY } from './common'

export const ecdfRegressionLine: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as IHistogramChartSpec
  const { advancedVSeed, vseed } = context
  const { chartType, encoding = {} as Encoding, dimensions = [], regressionLine } = advancedVSeed
  const { dataset } = vseed
  const lineTheme = advancedVSeed.config[chartType as 'histogram']?.regressionLine as RegressionLineConfig

  if (!regressionLine || !regressionLine.ecdfRegressionLine) {
    return result
  }

  const rowColumnFields = uniqueBy(
    dimensions.filter((dim: Dimension) => dim.encoding === 'row' || dim.encoding === 'column'),
    (item: Dimension) => item.id,
  )

  const lineList = array(regressionLine.ecdfRegressionLine).filter((ecdfLine) => ecdfLine.enable !== false)

  if (!result.extensionMark) {
    result.extensionMark = []
  }

  lineList.forEach((line, lineIndex) => {
    if (line.enable === false) {
      return
    }
    const theme = (lineTheme?.ecdfRegressionLine ?? {}) as EcdfRegressionLine
    const { color, lineWidth, lineDash, text, textColor, textFontSize, textFontWeight } = line as EcdfRegressionLine

    const childrenMarks: any[] = []

    ;(result.extensionMark as any[]).push({
      type: 'group',
      interactive: false,
      zIndex: 500,
      name: `ecdfRegressionLine-${lineIndex}`,
      dataId: (spec.data as any)?.id,
      style: {
        data: (datum: any, ctx: any) => {
          const vchart = ctx.vchart as IVChart
          const chart = vchart.getChart() as IChart
          const series = chart.getAllSeries().filter((s: any) => s.type === 'bar')

          // 直方图使用的是bar系列
          if (series && series.length) {
            const s = series[0] as ICartesianSeries

            const fieldX = s.fieldX?.[0]
            const scaleY = s.getYAxisHelper().getScale?.(0)
            const viewData = s.getViewData()?.latestData

            if (!dataset || !dataset.length || !viewData || !viewData.length || !scaleY) {
              return null
            }
            const simpleData = dataset
              .filter((entry: Datum) => {
                return rowColumnFields.length
                  ? rowColumnFields.every((dim: Dimension) => {
                      return entry[dim.id] === viewData[0][dim.id]
                    })
                  : true
              })
              .map((d: Datum) => +(d as any)[encoding.value?.[0] as string])
            const res = ecdf(simpleData)
            const N = Math.max(3, Math.floor(simpleData.length / 4))
            const lineData = res.evaluateGrid(N)
            const yRange = scaleY.range()
            const y0 = yRange[0]
            const y1 = yRange[yRange.length - 1]
            const scaleR = (e: number) => {
              return y0 + (y1 - y0) * e
            }

            const linePoints = lineData.map((ld: Datum) => {
              const d = { [fieldX]: ld.x }
              return {
                x: s.dataToPositionX(d)!,
                y: scaleR(ld.y as number),
              }
            })

            return {
              linePoints,
              color: color ?? s.getOption().globalScale.getScale('color')?.scale(s.getSeriesKeys()[0]),
            }
          }
          return null
        },
      },
      children: childrenMarks,
    })

    childrenMarks.push({
      type: 'line',
      interactive: false,
      zIndex: 500,
      dataId: (spec.data as any)?.id,
      style: {
        lineWidth: lineWidth ?? theme.lineWidth,
        lineDash: lineDash ?? theme.lineDash,
        stroke: color ?? defaultRegressionLineColor,
        points: (datum: any, ctx: any, opt: any) => {
          const parentNode = opt.mark?._product?.parent

          if (parentNode?.attribute?.data) {
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
        dataId: (spec.data as any)?.id,
        dataKey: () => {
          return `ecdfRegressionLine-label-${lineIndex}`
        },
        style: {
          textAlign: 'end',
          fill: textColor ?? theme.textColor,
          fontSize: textFontSize ?? theme.textFontSize,
          fontWeight: textFontWeight ?? theme.textFontWeight,
          text: text,
          x: defaultRegressionLineLabelX,
          y: defaultRegressionLineLabelY,
        },
      })
    }
  })

  // add percent axis of ecdf
  const leftAxis = result.axes?.find((v) => v.orient === 'left')
  if (leftAxis && lineList.length) {
    result.axes?.push({
      visible: true,
      orient: 'right',
      type: 'linear',
      base: 10,
      min: 0,
      max: 1,
      domainLine: {
        ...leftAxis.domainLine,
      },
      grid: {
        visible: false,
      },
      tick: {
        ...leftAxis.tick,
      },
      title: {
        ...leftAxis.title,
        visible: false,
      },
      label: {
        ...leftAxis.label,
        visible: true,
        formatMethod: (v) => {
          const text = isArray(v) ? v[0] : v
          return `${(+text * 100).toFixed(1)}%`
        },
      },
    })
  }

  return result
}
