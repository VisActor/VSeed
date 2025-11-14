import type { SpecPipeline } from 'src/types'
import { areaPercentAdvancedPipeline, areaPercentSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerAreaPercent = () => {
  Builder._advancedPipelineMap['areaPercent'] = areaPercentAdvancedPipeline
  Builder._specPipelineMap['areaPercent'] = areaPercentSpecPipeline as SpecPipeline<ISpec>
}
