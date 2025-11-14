import type { SpecPipeline } from 'src/types'
import { roseParallelAdvancedPipeline, roseParallelSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerRoseParallel = () => {
  Builder._advancedPipelineMap['roseParallel'] = roseParallelAdvancedPipeline
  Builder._specPipelineMap['roseParallel'] = roseParallelSpecPipeline as SpecPipeline<ISpec>
}
