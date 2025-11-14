import type { SpecPipeline } from 'src/types'
import { roseAdvancedPipeline, roseSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerRose = () => {
  Builder._advancedPipelineMap['rose'] = roseAdvancedPipeline
  Builder._specPipelineMap['rose'] = roseSpecPipeline as SpecPipeline<ISpec>
}
