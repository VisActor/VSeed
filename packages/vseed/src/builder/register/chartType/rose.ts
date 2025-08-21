import { roseAdvancedPipeline, roseSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerRose = () => {
  Builder._advancedPipelineMap['rose'] = roseAdvancedPipeline
  Builder._specPipelineMap['rose'] = roseSpecPipeline
}