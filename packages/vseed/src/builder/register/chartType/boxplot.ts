import { boxplotAdvancedPipeline, boxplotSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerBoxplot = () => {
  Builder._advancedPipelineMap['boxPlot'] = boxplotAdvancedPipeline
  Builder._specPipelineMap['boxPlot'] = boxplotSpecPipeline
}
