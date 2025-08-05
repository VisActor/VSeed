import {
  areaAdvancedPipeline,
  areaPercentAdvancedPipeline,
  areaPercentSpecPipeline,
  areaSpecPipeline,
  barAdvancedPipeline,
  barParallelAdvancedPipeline,
  barParallelSpecPipeline,
  barPercentAdvancedPipeline,
  barPercentSpecPipeline,
  barSpecPipeline,
  columnAdvancedPipeline,
  columnParallelAdvancedPipeline,
  columnParallelSpecPipeline,
  columnPercentAdvancedPipeline,
  columnPercentSpecPipeline,
  columnSpecPipeline,
  lineAdvancedPipeline,
  lineSpecPipeline,
} from '../../pipeline'
import { Builder } from '../builder'

export const registerAll = () => {
  registerLine()

  registerColumn()
  registerColumnParallel()
  registerColumnPercent()

  registerBar()
  registerBarParallel()
  registerBarPercent()

  registerArea()
  registerAreaPercent()
}

export const registerColumn = () => {
  Builder._advancedPipelineMap['column'] = columnAdvancedPipeline
  Builder._specPipelineMap['column'] = columnSpecPipeline
}

export const registerBar = () => {
  Builder._advancedPipelineMap['bar'] = barAdvancedPipeline
  Builder._specPipelineMap['bar'] = barSpecPipeline
}

export const registerLine = () => {
  Builder._advancedPipelineMap['line'] = lineAdvancedPipeline
  Builder._specPipelineMap['line'] = lineSpecPipeline
}

export const registerArea = () => {
  Builder._advancedPipelineMap['area'] = areaAdvancedPipeline
  Builder._specPipelineMap['area'] = areaSpecPipeline
}

export const registerAreaPercent = () => {
  Builder._advancedPipelineMap['areaPercent'] = areaPercentAdvancedPipeline
  Builder._specPipelineMap['areaPercent'] = areaPercentSpecPipeline
}

export const registerBarPercent = () => {
  Builder._advancedPipelineMap['barPercent'] = barPercentAdvancedPipeline
  Builder._specPipelineMap['barPercent'] = barPercentSpecPipeline
}

export const registerColumnPercent = () => {
  Builder._advancedPipelineMap['columnPercent'] = columnPercentAdvancedPipeline
  Builder._specPipelineMap['columnPercent'] = columnPercentSpecPipeline
}

export const registerColumnParallel = () => {
  Builder._advancedPipelineMap['columnParallel'] = columnParallelAdvancedPipeline
  Builder._specPipelineMap['columnParallel'] = columnParallelSpecPipeline
}

export const registerBarParallel = () => {
  Builder._advancedPipelineMap['barParallel'] = barParallelAdvancedPipeline
  Builder._specPipelineMap['barParallel'] = barParallelSpecPipeline
}
