import type { IHistogramChartSpec, IMarkPointSpec } from '@visactor/vchart'
import type { Datum, VChartSpecPipe } from 'src/types'
import { isSubset } from './utils'
import { generateAnnotationPointPipe } from './annotationPointCommon'

export const annotationPointOfHistogram: VChartSpecPipe = generateAnnotationPointPipe({
  generateMarkPoint: (datum: Datum, spec) => {
    const histogramSpec = spec as IHistogramChartSpec
    const xField = histogramSpec.xField as string
    const x2Field = histogramSpec.x2Field as string

    return [
      {
        coordinate: (data: Datum[]) => {
          const d = data.find((item) => isSubset(datum, item))

          return d
            ? {
                ...d,
                [xField]: (d[xField] + d[x2Field]) / 2,
              }
            : undefined
        },
      } as IMarkPointSpec,
    ]
  },
})
