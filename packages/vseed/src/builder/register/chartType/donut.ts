import type { SpecPipeline } from 'src/types'
import { donutAdvancedPipeline, donutSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerDonut = () => {
  Builder._advancedPipelineMap['donut'] = donutAdvancedPipeline
  Builder._specPipelineMap['donut'] = donutSpecPipeline as SpecPipeline<ISpec>
}
