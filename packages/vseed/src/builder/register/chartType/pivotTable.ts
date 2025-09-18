import { pivotTableAdvancedPipeline, pivotTableSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerPivotTable = () => {
  Builder._advancedPipelineMap['pivotTable'] = pivotTableAdvancedPipeline
  Builder._specPipelineMap['pivotTable'] = pivotTableSpecPipeline
}
