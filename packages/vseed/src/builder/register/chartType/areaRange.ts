import { areaRangeAdvancedPipeline, areaRangeSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerAreaRange = () => {
  Builder._advancedPipelineMap['areaRange'] = areaRangeAdvancedPipeline
  Builder._specPipelineMap['areaRange'] = areaRangeSpecPipeline
}