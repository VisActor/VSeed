import type { Measure, MeasureGroup } from 'src/types'
import { ChartTypeEnum } from '../constant'

export const isMeasure = (measure: Measure | MeasureGroup): measure is Measure => {
  return !('children' in measure)
}

export const isMeasureGroup = (measure: Measure | MeasureGroup): measure is MeasureGroup => {
  return 'children' in measure
}

export const isMeasures = (measures: Measure[] | MeasureGroup[]): measures is Measure[] => {
  return measures.every(isMeasure)
}

export const isPositionMeasure = (measure: Measure, chartType: string): boolean => {
  if (!measure.encoding) {
    return true
  }

  if (chartType === ChartTypeEnum.Funnel) {
    return measure.encoding === 'size'
  }

  if (chartType === ChartTypeEnum.Heatmap) {
    return measure.encoding === 'color'
  }

  if (
    ([ChartTypeEnum.Pie, ChartTypeEnum.Donut, ChartTypeEnum.Rose, ChartTypeEnum.RoseParallel] as string[]).includes(
      chartType,
    )
  ) {
    return measure.encoding === 'angle'
  }

  if (chartType === ChartTypeEnum.DualAxis) {
    return ['primaryAxis', 'secondaryAxis'].includes(measure.encoding as string)
  }

  if (ChartTypeEnum.Radar === chartType) {
    return measure.encoding === 'radius'
  }

  if (
    (
      [
        ChartTypeEnum.Line,
        ChartTypeEnum.Area,
        ChartTypeEnum.AreaPercent,
        ChartTypeEnum.Column,
        ChartTypeEnum.ColumnParallel,
        ChartTypeEnum.ColumnPercent,
      ] as string[]
    ).includes(chartType)
  ) {
    return measure.encoding === 'yAxis'
  }

  if (([ChartTypeEnum.Bar, ChartTypeEnum.BarParallel, ChartTypeEnum.BarPercent] as string[]).includes(chartType)) {
    return measure.encoding === 'xAxis'
  }

  return chartType === ChartTypeEnum.Boxplot && measure.encoding === 'value'
}
