import { MeasureId } from 'src/dataReshape'
import type { Dimensions, SpecPipe } from 'src/types'

export const pivotRows: SpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const dimensions = advancedVSeed.dimensions as Dimensions
  const { encoding, measures } = advancedVSeed
  const rows = dimensions.filter((item) => encoding.row?.includes(item.id))

  return {
    ...spec,
    rows: rows.map((item) => {
      const res = {
        dimensionKey: item.id,
        title: item.alias || item.id,
        width: 'auto',
      }

      if (item.id === MeasureId) {
        ;(res as any).headerFormat = (measureId: string) => {
          const measure = measures.find((m) => m.id === measureId)

          return measure?.alias ?? measureId
        }
      }

      return res
    }),
  }
}
