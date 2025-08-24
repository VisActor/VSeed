import { dualAxisAdvancedPipeline, dualAxisSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerDualAxis = () => {
  Builder._advancedPipelineMap['dualAxis'] = dualAxisAdvancedPipeline
  Builder._specPipelineMap['dualAxis'] = dualAxisSpecPipeline
}
