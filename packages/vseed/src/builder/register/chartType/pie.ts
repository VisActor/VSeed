import { pieAdvancedPipeline, pieSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerPie = () => {
  Builder._advancedPipelineMap['pie'] = pieAdvancedPipeline
  Builder._specPipelineMap['pie'] = pieSpecPipeline
}
