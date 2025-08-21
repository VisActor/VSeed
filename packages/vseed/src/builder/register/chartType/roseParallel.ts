import { roseParallelAdvancedPipeline, roseParallelSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerRoseParallel = () => {
  Builder._advancedPipelineMap['roseParallel'] = roseParallelAdvancedPipeline
  Builder._specPipelineMap['roseParallel'] = roseParallelSpecPipeline
}