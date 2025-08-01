import { barAdvancedPipeline, barSpecPipeline, columnAdvancedPipeline, columnSpecPipeline } from '../../pipeline'
import { Builder } from '../builder'

export const registerAll = () => {
  registerColumn()
  registerBar()
}

export const registerColumn = () => {
  Builder._advancedPipelineMap['column'] = columnAdvancedPipeline
  Builder._specPipelineMap['column'] = columnSpecPipeline
}

export const registerBar = () => {
  Builder._advancedPipelineMap['bar'] = barAdvancedPipeline
  Builder._specPipelineMap['bar'] = barSpecPipeline
}
