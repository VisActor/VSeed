/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { SpecPipe } from 'src/types'
import { colorLegend } from './colorLegend'
import type { Datum, IHeatmapChartSpec } from '@visactor/vchart'
import { HideItemEncoding } from 'src/dataReshape/constant'

export const heatmapColorLegend: SpecPipe = (spec, context) => {
  const result = colorLegend(spec, context) as IHeatmapChartSpec

  if (result.legends) {
    ;(result.legends as any).customFilter = (data: Datum[], range: number[], key: string) => {
      console.log(data, range, key)
      const min = Math.min(range[0], range[1])
      const max = Math.max(range[0], range[1])
      return (data ?? []).map((entry: Datum) => {
        const val = entry[key]
        const isHide = val - min < -1e-6 || val - max > 1e-6

        entry[HideItemEncoding] = isHide

        return entry
      })
    }
  }

  return result
}
