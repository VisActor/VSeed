import type { SpecPipeline } from 'src/types'
import { columnParallelAdvancedPipeline, columnParallelSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerColumnParallel = () => {
  Builder._advancedPipelineMap['columnParallel'] = columnParallelAdvancedPipeline
  Builder._specPipelineMap['columnParallel'] = columnParallelSpecPipeline as SpecPipeline<ISpec>
}
