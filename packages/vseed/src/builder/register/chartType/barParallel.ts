import type { SpecPipeline } from 'src/types'
import { barParallelAdvancedPipeline, barParallelSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerBarParallel = () => {
  Builder._advancedPipelineMap['barParallel'] = barParallelAdvancedPipeline
  Builder._specPipelineMap['barParallel'] = barParallelSpecPipeline as SpecPipeline<ISpec>
}
