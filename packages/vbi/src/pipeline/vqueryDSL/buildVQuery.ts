import type { VQueryDSL } from '@visactor/vquery'
import { VBIDSL } from 'src/types'
import { MeasuresBuilder, VBIBuilder } from 'src/builder'
import { pipe } from 'remeda'

type buildPipe = (queryDSL: VQueryDSL, context: { vbiDSL: VBIDSL; builder: VBIBuilder }) => VQueryDSL

export const buildVQuery = (vbiDSL: VBIDSL, builder: VBIBuilder) => {
  const wrapper = (processor: (queryDSL: VQueryDSL, context: { vbiDSL: VBIDSL; builder: VBIBuilder }) => VQueryDSL) => {
    return (queryDSL: VQueryDSL): VQueryDSL => processor(queryDSL, { vbiDSL, builder })
  }

  return pipe({} as VQueryDSL, wrapper(buildSelect), wrapper(buildLimit))
}

const buildSelect: buildPipe = (queryDSL, context) => {
  const { vbiDSL } = context
  const measures = vbiDSL.measures

  const result = { ...queryDSL }
  const nodes = measures.filter((measure) => MeasuresBuilder.isMeasureNode(measure))
  const selects = nodes.map((measure) => {
    return {
      field: measure.field,
      alias: measure.alias,
      func: measure.aggregate.func,
    }
  })

  result.select = selects

  return result as VQueryDSL
}

const buildLimit: buildPipe = (queryDSL) => {
  const result = { ...queryDSL }

  result.limit = 1000

  return result as VQueryDSL
}
