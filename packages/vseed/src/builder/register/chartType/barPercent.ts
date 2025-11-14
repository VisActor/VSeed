import type { SpecPipeline } from 'src/types'
import { barPercentAdvancedPipeline, barPercentSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerBarPercent = () => {
  Builder._advancedPipelineMap['barPercent'] = barPercentAdvancedPipeline
  Builder._specPipelineMap['barPercent'] = barPercentSpecPipeline as SpecPipeline<ISpec>
}
