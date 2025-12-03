import { boxplotAdvancedPipeline, boxplotSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerBoxPlot = () => {
  Builder._advancedPipelineMap['boxPlot'] = boxplotAdvancedPipeline
  Builder._specPipelineMap['boxPlot'] = boxplotSpecPipeline
}
