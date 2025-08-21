import { lineAdvancedPipeline, lineSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerLine = () => {
  Builder._advancedPipelineMap['line'] = lineAdvancedPipeline
  Builder._specPipelineMap['line'] = lineSpecPipeline
}