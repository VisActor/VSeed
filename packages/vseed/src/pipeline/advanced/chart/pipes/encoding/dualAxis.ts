import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'
import { getBasicDimensions } from '../init'
import { getBasicMeasures } from '../measures'

export const encodingForDualAxis: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { measures: vseedMeasures = [] } = vseed
  // prepare measures and dimensions
  const measures = vseedMeasures.length ? findAllMeasures(vseedMeasures) : getBasicMeasures(vseed)
  const dimensions = getBasicDimensions(vseed)

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
      .filter((item) => item.encoding === 'primaryYAxis' || item.encoding === 'secondaryYAxis' || !item.encoding)
      .map((item) => item.id),
  )
}

const generateDefaultDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  const onlyMeasureName = dimensions.length === 1 && dimensions.find((item) => item.id === MeasureName)
  const uniqueDimIds = unique(dimensions.map((d) => d.id))

  encoding.x = uniqueDimIds.slice(0, 1) // 第一个维度放置于X轴
  encoding.color = uniqueDimIds.slice(onlyMeasureName ? 0 : 1) // 第二个之后的维度用于颜色
  encoding.detail = uniqueDimIds.slice(onlyMeasureName ? 0 : 1) // 第二个之后的维度用于详情
  encoding.tooltip = uniqueDimIds // 展示所有维度
  encoding.label = [] // 默认不展示标签
  encoding.row = [] // 默认不进行行透视
  encoding.column = [] // 默认不进行列透视
}

const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  encoding.tooltip = measures.map((item) => item.id)
  encoding.y = unique(
    measures
      .filter((item) => item.encoding === 'primaryYAxis' || item.encoding === 'secondaryYAxis' || !item.encoding)
      .map((item) => item.id),
  )
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = color
  }
  return encoding
}

const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  encoding.x = unique(dimensions.filter((item) => item.encoding === 'xAxis').map((item) => item.id))
  encoding.color = unique(dimensions.filter((item) => item.encoding === 'color').map((item) => item.id))
  encoding.detail = unique(dimensions.filter((item) => item.encoding === 'detail').map((item) => item.id))

  if (encoding.x.length === 0) {
    encoding.x = [dimensions[0].id]
  }
  if (encoding.color.length === 0) {
    encoding.color = dimensions.filter((item) => !encoding.x?.includes(item.id)).map((item) => item.id)
  }
  if (encoding.detail.length === 0) {
    encoding.detail = dimensions.filter((item) => !encoding.x?.includes(item.id)).map((item) => item.id)
  }
}
