import { heatmapAdvancedPipeline, heatmapSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerHeatmap = () => {
  Builder._advancedPipelineMap['heatmap'] = heatmapAdvancedPipeline
  Builder._specPipelineMap['heatmap'] = heatmapSpecPipeline
}
