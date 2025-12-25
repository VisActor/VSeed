import { DATUM_HIDE_KEY } from 'src/pipeline/utils/constant'
import type { VChartSpecPipe } from 'src/types'

export const cellStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const cell = advancedVSeed.config?.[chartType as 'heatmap']?.cell

  return {
    ...spec,
    cell: {
      style: {
        visible: (datum: any) => {
          return datum?.[DATUM_HIDE_KEY] !== true
        },
        shape: 'rect',
        stroke: cell?.stroke,
        lineWidth: cell?.lineWidth ?? 1,
      },
      state: {
        hover: {
          // innerBorder: {
          //   lineWidth: 1,
          //   stroke: cell?.hoverShadowColor,
          //   distance: 1,
          // },
          shadowColor: cell?.hoverShadowColor,
          shadowBlur: 5,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
      },
    },
  }
}
