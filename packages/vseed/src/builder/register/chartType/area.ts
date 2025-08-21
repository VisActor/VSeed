import { areaAdvancedPipeline, areaSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerArea = () => {
  Builder._advancedPipelineMap['area'] = areaAdvancedPipeline
  Builder._specPipelineMap['area'] = areaSpecPipeline
}