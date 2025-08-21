import { barParallelAdvancedPipeline, barParallelSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerBarParallel = () => {
  Builder._advancedPipelineMap['barParallel'] = barParallelAdvancedPipeline
  Builder._specPipelineMap['barParallel'] = barParallelSpecPipeline
}