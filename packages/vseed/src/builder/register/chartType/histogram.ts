import { histogramSpecPipeline, histogramAdvancedPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerHistogram = () => {
  Builder._advancedPipelineMap['histogram'] = histogramAdvancedPipeline
  Builder._specPipelineMap['histogram'] = histogramSpecPipeline
}
