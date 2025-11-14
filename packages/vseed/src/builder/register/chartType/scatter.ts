import type { ISpec } from '@visactor/vchart'
import { scatterAdvancedPipeline, scatterSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { SpecPipeline } from 'src/types'

export const registerScatter = () => {
  Builder._advancedPipelineMap['scatter'] = scatterAdvancedPipeline
  Builder._specPipelineMap['scatter'] = scatterSpecPipeline as SpecPipeline<ISpec>
}
