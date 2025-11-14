import type { SpecPipeline } from 'src/types'
import { areaAdvancedPipeline, areaSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerArea = () => {
  Builder._advancedPipelineMap['area'] = areaAdvancedPipeline
  Builder._specPipelineMap['area'] = areaSpecPipeline as SpecPipeline<ISpec>
}
