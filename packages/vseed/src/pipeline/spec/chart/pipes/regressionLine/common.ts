import type { Datum, ICartesianSeries, IChart, IVChart } from '@visactor/vchart'

export const defaultRegressionLineColor = (datum: Datum, ctx: any): string | undefined => {
  const vchart = ctx.vchart as IVChart
  const chart = vchart.getChart() as IChart
  const series = chart.getAllSeries()[0]

  return series ? series.getOption().globalScale.getScale('color')?.scale(series.getSeriesKeys()[0]) : undefined
}

export const defaultRegressionLineLabelX = (datum: any, ctx: any) => {
  const vchart = ctx.vchart as IVChart
  const chart = vchart.getChart() as IChart
  const s = chart.getAllSeries()[0] as ICartesianSeries
  // 直方图使用的是bar系列
  if (s) {
    const startPoint = s.getRegion().getLayoutStartPoint()

    const fieldX = s.fieldX[0]
    const fieldX2 = s.fieldX2
    const scaleY = s.getYAxisHelper().getScale?.(0)
    const viewData = s.getViewData()?.latestData
    if (!viewData || !viewData.length || !scaleY) {
      return undefined
    }
    const maxX = Math.max.apply(
      null,
      (viewData as any[]).map((d: Datum) => Math.max((d as any)[fieldX] as number, (d as any)[fieldX2] as number)),
    )
    return startPoint.x + s.dataToPositionX({ [fieldX]: maxX })!
  }

  return undefined
}
