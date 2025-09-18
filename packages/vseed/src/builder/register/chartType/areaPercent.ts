import { areaPercentAdvancedPipeline, areaPercentSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerAreaPercent = () => {
  Builder._advancedPipelineMap['areaPercent'] = areaPercentAdvancedPipeline
  Builder._specPipelineMap['areaPercent'] = areaPercentSpecPipeline
}
