import type { SpecPipeline } from 'src/types'
import { histogramSpecPipeline, histogramAdvancedPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerHistogram = () => {
  Builder._advancedPipelineMap['histogram'] = histogramAdvancedPipeline
  Builder._specPipelineMap['histogram'] = histogramSpecPipeline as SpecPipeline<ISpec>
}
