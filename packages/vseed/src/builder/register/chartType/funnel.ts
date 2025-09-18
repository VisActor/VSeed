import { funnelAdvancedPipeline, funnelSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerFunnel = () => {
  Builder._advancedPipelineMap['funnel'] = funnelAdvancedPipeline
  Builder._specPipelineMap['funnel'] = funnelSpecPipeline
}
