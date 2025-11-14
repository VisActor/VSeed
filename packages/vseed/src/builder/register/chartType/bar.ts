import type { SpecPipeline } from 'src/types'
import { barAdvancedPipeline, barSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerBar = () => {
  Builder._advancedPipelineMap['bar'] = barAdvancedPipeline
  Builder._specPipelineMap['bar'] = barSpecPipeline as SpecPipeline<ISpec>
}
