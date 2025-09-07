import type { IScatterChartSpec } from '@visactor/vchart'
import type { ISeriesMarkAttributeContext } from '@visactor/vchart/esm/compile/mark'
import type { SpecPipe } from 'src/types'

export const pointStateDimensionHover: SpecPipe = (spec) => {
  const point = (spec as IScatterChartSpec).point || {}
  const result = {
    ...spec,
    point: {
      ...point,
      state: {
        ...(point.state || {}),
        dimension_hover: {
          scaleX: 1.4,
          scaleY: 1.4,
          outerBorder: {
            lineWidth: 4,
            strokeOpacity: 0.25,
            distance: 2,
          },
        },
      },
    },
  } as IScatterChartSpec
  return result
}

export const pointStateHover: SpecPipe = (spec, context) => {
  const point = (spec as IScatterChartSpec).point || {}
  const { advancedVSeed } = context
  const { datasetReshapeInfo } = advancedVSeed
  const { unfoldInfo } = datasetReshapeInfo[0]
  const result = {
    ...spec,
    point: {
      ...point,
      state: {
        ...(point.state || {}),
        hover: {
          scaleX: 1.4,
          scaleY: 1.4,
          stroke: (datum, context: ISeriesMarkAttributeContext) => {
            const field = unfoldInfo.encodingColorId
            const color = context.seriesColor(datum[field] as string)
            return color
          },
          fillOpacity: 0.6,
          lineWidth: 1,
        },
      },
    },
  } as IScatterChartSpec
  return result
}
