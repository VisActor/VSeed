import type { ICartesianSeries, IChart, IHistogramChartSpec, IVChart } from '@visactor/vchart'
import type { KDEOptions } from '@visactor/vutils'
import { isNullish, uniqueBy } from 'remeda'
import { kde, array } from '@visactor/vutils'
import { BinEndMeasureId, BinStartMeasureId } from 'src/dataReshape'
import type { Datum, Dimension, SpecPipe, Encoding, RegressionLineConfig, KdeRegressionLine, Spec } from 'src/types'
import { defaultRegressionLineColor, defaultRegressionLineLabelX, defaultRegressionLineLabelY } from './common'

export const kdeRegressionLine: SpecPipe<Spec> = (spec, context) => {
  const result = { ...spec } as IHistogramChartSpec
  const { advancedVSeed, vseed } = context
  const { chartType, encoding = {} as Encoding, dimensions, regressionLine } = advancedVSeed
  const { dataset } = vseed
  const lineTheme = advancedVSeed.config[chartType as 'histogram']?.regressionLine as RegressionLineConfig

  if (!regressionLine || !regressionLine.kdeRegressionLine) {
    return result
  }

  const rowColumnFields = uniqueBy(
    dimensions.filter((dim: Dimension) => dim.encoding === 'row' || dim.encoding === 'column'),
    (item: Dimension) => item.id,
  )

  const lineList = array(regressionLine.kdeRegressionLine).filter((kdeLine) => kdeLine.enable !== false)

  if (!result.customMark) {
    result.customMark = []
  }

  lineList.forEach((line, lineIndex) => {
    const theme = (lineTheme.kdeRegressionLine ?? {}) as KdeRegressionLine
    const { color, lineWidth, lineDash, text, textColor, textFontSize, textFontWeight } = line as KdeRegressionLine

    const childrenMarks: any[] = []

    ;(result.customMark as any[]).push({
      type: 'group',
      interactive: false,
      zIndex: 500,
      name: `kdeRegressionLine-${lineIndex}`,
      style: {
        data: (datum: any, ctx: any) => {
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
            const res = kde(simpleData, {
              bandwidth: Math.abs(viewData[0][BinEndMeasureId] - viewData[0][BinStartMeasureId]),
            } as KDEOptions)
            const N = Math.max(3, Math.floor(simpleData.length / 4))
            const lineData = res.evaluateGrid(N)
            const scaleR = (k: number) => {
              return scaleY.scale(k * simpleData.length * res.bandwidth)
            }

            const linePoints = lineData.map((ld: Datum) => {
              const d = { [fieldX]: ld.x }
              return {
                x: s.dataToPositionX(d)! + region.x,
                y: scaleR(ld.y as number) + region.y,
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
          x: defaultRegressionLineLabelX,
          y: defaultRegressionLineLabelY,
        },
      })
    }
  })

  return result
}
