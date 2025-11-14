import type { SpecPipeline } from 'src/types'
import { radarAdvancedPipeline, radarSpecPipeline } from '../../../pipeline'
import { Builder } from '../../builder'
import type { ISpec } from '@visactor/vchart'

export const registerRadar = () => {
  Builder._advancedPipelineMap['radar'] = radarAdvancedPipeline
  Builder._specPipelineMap['radar'] = radarSpecPipeline as SpecPipeline<ISpec>
}
