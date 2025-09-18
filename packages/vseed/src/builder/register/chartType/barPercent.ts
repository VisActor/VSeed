import { barPercentAdvancedPipeline, barPercentSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerBarPercent = () => {
  Builder._advancedPipelineMap['barPercent'] = barPercentAdvancedPipeline
  Builder._specPipelineMap['barPercent'] = barPercentSpecPipeline
}
