import type { SpecPipeline } from 'src/types'
import { pieAdvancedPipeline, pieSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerPie = () => {
  Builder._advancedPipelineMap['pie'] = pieAdvancedPipeline
  Builder._specPipelineMap['pie'] = pieSpecPipeline as SpecPipeline<ISpec>
}
