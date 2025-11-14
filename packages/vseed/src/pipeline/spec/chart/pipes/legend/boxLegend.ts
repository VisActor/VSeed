/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { VChartSpecPipe } from 'src/types'
import { discreteLegend } from './discreteLegend'

export const boxLegend: VChartSpecPipe = (spec, context) => {
  const normalLegend = discreteLegend(spec, context) as any;
  normalLegend.legends = {
    ...normalLegend.legends,
    data: (data: any[]) => {
      return data.map(obj => {
        obj.shape.fill = obj.shape.stroke;
        return obj;
      })
    }
  }
  return normalLegend
}