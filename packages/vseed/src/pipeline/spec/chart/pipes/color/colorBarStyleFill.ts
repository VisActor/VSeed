import type { IBarChartSpec } from '@visactor/vchart'
import { findAllMeasures } from 'src/pipeline/utils'
import type { SpecPipe } from 'src/types'

export const colorBarStyleFill = (stylePipe: SpecPipe): SpecPipe => {
  return (spec, context) => {
    const result = stylePipe(spec, context) as IBarChartSpec

    const { advancedVSeed } = context
    const { datasetReshapeInfo, encoding, measures } = advancedVSeed
    const { unfoldInfo } = datasetReshapeInfo[0]
    const { color } = encoding
    const measureIdList = findAllMeasures(measures).map((measure) => measure.id)

    if (color?.length === 1 && measureIdList.includes(color[0])) {
      if (result?.bar?.style) {
        result.bar.style.fill = {
          field: unfoldInfo.encodingColor,
          scale: 'color',
        }
      }
    }

    return result
  }
}
