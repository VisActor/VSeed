import { columnParallelAdvancedPipeline, columnParallelSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerColumnParallel = () => {
  Builder._advancedPipelineMap['columnParallel'] = columnParallelAdvancedPipeline
  Builder._specPipelineMap['columnParallel'] = columnParallelSpecPipeline
}