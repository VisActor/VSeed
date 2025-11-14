import type { SpecPipeline } from 'src/types'
import { boxplotAdvancedPipeline, boxplotSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerBoxplot = () => {
  Builder._advancedPipelineMap['boxPlot'] = boxplotAdvancedPipeline
  Builder._specPipelineMap['boxPlot'] = boxplotSpecPipeline as SpecPipeline<ISpec>
}
