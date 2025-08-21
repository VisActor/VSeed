import { tableAdvancedPipeline, tableSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerTable = () => {
  Builder._advancedPipelineMap['table'] = tableAdvancedPipeline
  Builder._specPipelineMap['table'] = tableSpecPipeline
}