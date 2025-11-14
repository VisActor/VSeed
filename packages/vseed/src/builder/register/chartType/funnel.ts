import type { SpecPipeline } from 'src/types'
import { funnelAdvancedPipeline, funnelSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerFunnel = () => {
  Builder._advancedPipelineMap['funnel'] = funnelAdvancedPipeline
  Builder._specPipelineMap['funnel'] = funnelSpecPipeline as SpecPipeline<ISpec>
}
