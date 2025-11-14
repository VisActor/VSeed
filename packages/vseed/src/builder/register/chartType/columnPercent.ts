import type { SpecPipeline } from 'src/types'
import { columnPercentAdvancedPipeline, columnPercentSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerColumnPercent = () => {
  Builder._advancedPipelineMap['columnPercent'] = columnPercentAdvancedPipeline
  Builder._specPipelineMap['columnPercent'] = columnPercentSpecPipeline as SpecPipeline<ISpec>
}
