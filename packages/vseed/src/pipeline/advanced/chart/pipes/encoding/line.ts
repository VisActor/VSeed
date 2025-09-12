import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'

export const encodingForLine: AdvancedPipe = (advancedVSeed) => {
  const { measures: vseedMeasures = [], dimensions = [] } = advancedVSeed
  const measures = findAllMeasures(vseedMeasures)

  const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
  const hasMeasureEncoding = measures.some((item: Measure) => item.encoding)
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
  encoding.y = unique(measures.filter((item) => item.encoding === 'yAxis' || !item.encoding).map((item) => item.id))
}

const generateDefaultDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  const uniqueDimIds = unique(dimensions.map((d) => d.id))

  encoding.x = uniqueDimIds.slice(0, 1)
  encoding.color = uniqueDimIds.slice(1)
  encoding.tooltip = uniqueDimIds // 展示所有维度
  encoding.detail = [] // 折线图暂不支持细分
  encoding.label = []
  encoding.row = []
  encoding.column = []
}

const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.tooltip = measures.map((item) => item.id)
  encoding.y = unique(measures.filter((item) => item.encoding === 'yAxis' || !item.encoding).map((item) => item.id))
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = color
  }
}

const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  encoding.x = unique(dimensions.filter((item) => item.encoding === 'xAxis').map((item) => item.id))
  encoding.color = unique(dimensions.filter((item) => item.encoding === 'color').map((item) => item.id))
  encoding.detail = []

  if (encoding.x.length === 0) {
    encoding.x = [dimensions[0].id]
  }
  if (encoding.color.length === 0) {
    encoding.color = [MeasureName]
  }
}
