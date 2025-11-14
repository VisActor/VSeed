import type { SpecPipeline } from 'src/types'
import { dualAxisAdvancedPipeline, dualAxisSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerDualAxis = () => {
  Builder._advancedPipelineMap['dualAxis'] = dualAxisAdvancedPipeline
  Builder._specPipelineMap['dualAxis'] = dualAxisSpecPipeline as SpecPipeline<ISpec>
}
