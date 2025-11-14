import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedVSeed, PivotChartSpecPipe, VChartSpecPipe, VSeed, Pipe, SpecPipelineContext } from 'src/types'

export function colorAdapter(ordinalPipe: PivotChartSpecPipe, linearPipe: PivotChartSpecPipe): PivotChartSpecPipe
export function colorAdapter(ordinalPipe: VChartSpecPipe, linearPipe: VChartSpecPipe): VChartSpecPipe
export function colorAdapter<TSpec>(
  ordinalPipe: Pipe<TSpec, SpecPipelineContext>,
  linearPipe: Pipe<TSpec, SpecPipelineContext>,
) {
  return (spec: Partial<TSpec>, context: SpecPipelineContext) => {
    const { advancedVSeed, vseed } = context
    if (isLinearColor(advancedVSeed, vseed)) {
      return linearPipe(spec, context)
    }
    return ordinalPipe(spec, context)
  }
}

export const isLinearColor = <T extends AdvancedVSeed, U extends VSeed>(advancedVSeed: T, vseed: U) => {
  const { encoding } = advancedVSeed
  const measures = vseed.measures || advancedVSeed.measures
  const measureIdList = findAllMeasures(measures).map((measure) => measure.id)
  const { color } = encoding
  return color?.length === 1 && measureIdList.includes(color[0])
}

export const getColorMeasureId = <T extends AdvancedVSeed, U extends VSeed>(
  advancedVSeed: T,
  vseed: U,
): string | undefined => {
  if (isLinearColor(advancedVSeed, vseed)) {
    const { encoding } = advancedVSeed
    const { color } = encoding
    return color?.[0]
  }
  return undefined
}
