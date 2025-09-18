import { columnAdvancedPipeline, columnSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerColumn = () => {
  Builder._advancedPipelineMap['column'] = columnAdvancedPipeline
  Builder._specPipelineMap['column'] = columnSpecPipeline
}
