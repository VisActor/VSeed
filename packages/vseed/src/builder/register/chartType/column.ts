import type { ISpec } from '@visactor/vchart'
import { columnAdvancedPipeline, columnSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { SpecPipeline } from 'src/types'

export const registerColumn = () => {
  Builder._advancedPipelineMap['column'] = columnAdvancedPipeline
  Builder._specPipelineMap['column'] = columnSpecPipeline as SpecPipeline<ISpec>
}
