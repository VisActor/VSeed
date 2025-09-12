import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'

export const encodingForScatter: AdvancedPipe = (advancedVSeed) => {
  const { measures: vseedMeasures = [], dimensions = [] } = advancedVSeed
  // prepare measures and dimensions
  const measures = findAllMeasures(vseedMeasures)

  // exist encoding condition
  const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
  const hasMeasureEncoding = measures.some((item: Measure) => item.encoding)

  // encoding for modify in place
  const encoding: Encoding = {}

  if (hasDimensionEncoding) {
    generateDimensionEncoding(dimensions, encoding)
  } else {
    generateDefaultDimensionEncoding(dimensions, encoding)
  }

  if (hasMeasureEncoding) {
    generateMeasureEncoding(measures, encoding)
  } else {
    generateDefaultMeasureEncoding(measures, encoding)
  }

  return { ...advancedVSeed, encoding }
}

const generateDefaultMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.tooltip = unique(measures.map((item) => item.id))
  encoding.y = unique(
    measures
      .filter((item) => item.encoding === 'xAxis' || item.encoding === 'yAxis' || !item.encoding)
      .map((item) => item.id),
  )
}

const generateDefaultDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  const dimensionsWithoutMeasureName = dimensions.filter((item) => item.id !== MeasureName)
  const uniqueDimIds = unique(dimensionsWithoutMeasureName.map((d) => d.id))

  encoding.color = uniqueDimIds.slice(0)
  encoding.detail = uniqueDimIds.slice(0)
  encoding.tooltip = uniqueDimIds // 展示所有维度
  encoding.label = [] // 默认不展示标签
  encoding.row = [] // 默认不进行行透视
  encoding.column = [] // 默认不进行列透视
}

const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.tooltip = measures.map((item) => item.id)
  encoding.y = unique(
    measures
      .filter((item) => item.encoding === 'xAxis' || item.encoding === 'yAxis' || !item.encoding)
      .map((item) => item.id),
  )
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = color
  }
}

const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  encoding.color = unique(dimensions.filter((item) => item.encoding === 'color').map((item) => item.id))
  encoding.detail = unique(dimensions.filter((item) => item.encoding === 'detail').map((item) => item.id))

  if (encoding.color.length === 0) {
    encoding.color = [MeasureName]
  }
  if (encoding.detail.length === 0) {
    encoding.detail = dimensions.filter((item) => !encoding.x?.includes(item.id)).map((item) => item.id)
  }
}
