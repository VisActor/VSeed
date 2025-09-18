import { donutAdvancedPipeline, donutSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerDonut = () => {
  Builder._advancedPipelineMap['donut'] = donutAdvancedPipeline
  Builder._specPipelineMap['donut'] = donutSpecPipeline
}
