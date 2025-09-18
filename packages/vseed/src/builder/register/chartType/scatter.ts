import { scatterAdvancedPipeline, scatterSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerScatter = () => {
  Builder._advancedPipelineMap['scatter'] = scatterAdvancedPipeline
  Builder._specPipelineMap['scatter'] = scatterSpecPipeline
}
