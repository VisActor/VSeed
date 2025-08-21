import { barAdvancedPipeline, barSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerBar = () => {
  Builder._advancedPipelineMap['bar'] = barAdvancedPipeline
  Builder._specPipelineMap['bar'] = barSpecPipeline
}