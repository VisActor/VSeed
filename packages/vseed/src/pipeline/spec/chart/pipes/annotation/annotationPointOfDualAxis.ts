import type { IMarkPointSpec, ISpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, SpecPipelineContext, VChartSpecPipe } from 'src/types'
import { isSubset } from './utils'
import { findAllMeasures } from 'src/pipeline/utils'
import { MeasureId } from 'src/dataReshape/constant'
import { pickWithout } from '@visactor/vutils'
import { generateAnnotationPointPipe } from './annotationPointCommon'

export const annotationPointOfDualAxis: VChartSpecPipe = generateAnnotationPointPipe({
  findSelectedDatas: (dataset, s, spec: ISpec, context: SpecPipelineContext) => {
    return dataset.reduce((res: Datum[], d: Datum) => {
      const { advancedVSeed } = context
      const allMeasureIds = findAllMeasures(advancedVSeed.reshapeMeasures ?? advancedVSeed.measures).map((m) => m.id)
      const pickedDatum = pickWithout(
        d,
        allMeasureIds.filter((id) => id !== d[MeasureId]),
      )

      if (selector(pickedDatum, s)) {
        res.push(pickedDatum)
      }

      return res
    }, [])
  },
  generateMarkPoint: (datum: Datum, spec: ISpec, context: SpecPipelineContext) => {
    const { advancedVSeed } = context
    const allMeasureIds = findAllMeasures(advancedVSeed.reshapeMeasures ?? advancedVSeed.measures).map((m) => m.id)
    return spec.series?.map((s: any, index: number) => {
      return {
        relativeSeriesIndex: index,
        coordinate: (data: Datum[]) => {
          return data.find((item) => {
            return isSubset(
              datum,
              item,
              allMeasureIds.filter((id) => id !== item[MeasureId]),
            )
          })
        },
      } as IMarkPointSpec
    })
  },
})
