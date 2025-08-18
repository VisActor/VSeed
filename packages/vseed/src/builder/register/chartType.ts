import {
  areaAdvancedPipeline,
  areaPercentAdvancedPipeline,
  areaPercentSpecPipeline,
  areaRangeAdvancedPipeline,
  areaRangeSpecPipeline,
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
  donutAdvancedPipeline,
  donutSpecPipeline,
  funnelAdvancedPipeline,
  funnelSpecPipeline,
  lineAdvancedPipeline,
  lineSpecPipeline,
  pieAdvancedPipeline,
  pieSpecPipeline,
  pivotTableAdvancedPipeline,
  pivotTableSpecPipeline,
  roseAdvancedPipeline,
  roseParallelAdvancedPipeline,
  roseParallelSpecPipeline,
  roseSpecPipeline,
  scatterAdvancedPipeline,
  scatterSpecPipeline,
  tableAdvancedPipeline,
  tableSpecPipeline,
} from '../../pipeline'
import { Builder } from '../builder'

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

export const registerAreaRange = () => {
  Builder._advancedPipelineMap['areaRange'] = areaRangeAdvancedPipeline
  Builder._specPipelineMap['areaRange'] = areaRangeSpecPipeline
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

export const registerPie = () => {
  Builder._advancedPipelineMap['pie'] = pieAdvancedPipeline
  Builder._specPipelineMap['pie'] = pieSpecPipeline
}

export const registerDonut = () => {
  Builder._advancedPipelineMap['donut'] = donutAdvancedPipeline
  Builder._specPipelineMap['donut'] = donutSpecPipeline
}

export const registerRose = () => {
  Builder._advancedPipelineMap['rose'] = roseAdvancedPipeline
  Builder._specPipelineMap['rose'] = roseSpecPipeline
}

export const registerRoseParallel = () => {
  Builder._advancedPipelineMap['roseParallel'] = roseParallelAdvancedPipeline
  Builder._specPipelineMap['roseParallel'] = roseParallelSpecPipeline
}

export const registerFunnel = () => {
  Builder._advancedPipelineMap['funnel'] = funnelAdvancedPipeline
  Builder._specPipelineMap['funnel'] = funnelSpecPipeline
}

export const registerScatter = () => {
  Builder._advancedPipelineMap['scatter'] = scatterAdvancedPipeline
  Builder._specPipelineMap['scatter'] = scatterSpecPipeline
}

export const registerTable = () => {
  Builder._advancedPipelineMap['table'] = tableAdvancedPipeline
  Builder._specPipelineMap['table'] = tableSpecPipeline
}

export const registerPivotTable = () => {
  Builder._advancedPipelineMap['pivotTable'] = pivotTableAdvancedPipeline
  Builder._specPipelineMap['pivotTable'] = pivotTableSpecPipeline
}
