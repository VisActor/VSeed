import { radarAdvancedPipeline, radarSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'

export const registerRadar = () => {
  Builder._advancedPipelineMap['radar'] = radarAdvancedPipeline
  Builder._specPipelineMap['radar'] = radarSpecPipeline
}
