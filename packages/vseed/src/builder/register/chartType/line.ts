import type { SpecPipeline } from 'src/types'
import { lineAdvancedPipeline, lineSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerLine = () => {
  Builder._advancedPipelineMap['line'] = lineAdvancedPipeline
  Builder._specPipelineMap['line'] = lineSpecPipeline as SpecPipeline<ISpec>
}
