import type { SpecPipeline } from 'src/types'
import { pivotTableAdvancedPipeline, pivotTableSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerPivotTable = () => {
  Builder._advancedPipelineMap['pivotTable'] = pivotTableAdvancedPipeline
  Builder._specPipelineMap['pivotTable'] = pivotTableSpecPipeline as SpecPipeline<ISpec>
}
