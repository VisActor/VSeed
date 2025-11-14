import type { SpecPipeline } from 'src/types'
import { heatmapAdvancedPipeline, heatmapSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerHeatmap = () => {
  Builder._advancedPipelineMap['heatmap'] = heatmapAdvancedPipeline
  Builder._specPipelineMap['heatmap'] = heatmapSpecPipeline as SpecPipeline<ISpec>
}
