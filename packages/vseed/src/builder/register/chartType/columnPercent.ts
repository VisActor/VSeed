import { columnPercentAdvancedPipeline, columnPercentSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerColumnPercent = () => {
  Builder._advancedPipelineMap['columnPercent'] = columnPercentAdvancedPipeline
  Builder._specPipelineMap['columnPercent'] = columnPercentSpecPipeline
}