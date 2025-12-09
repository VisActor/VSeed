import { unique } from 'remeda'
import { MeasureId } from 'src/dataReshape'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, Dimension, Dimensions, Encoding, Measure, Measures } from 'src/types'
import { addColorToEncoding } from './color'

export const defaultEncodingForHeatmap: AdvancedPipe = (advancedVSeed) => {
  const { measures: vseedMeasures = [], dimensions = [] } = advancedVSeed
  const measures = findAllMeasures(vseedMeasures)
  const encoding: Encoding = {}
  generateDefaultDimensionEncoding(dimensions, encoding)
  generateDefaultMeasureEncoding(measures, encoding)
  return { ...advancedVSeed, encoding }
}

export const encodingForHeatmap: AdvancedPipe = (advancedVSeed) => {
  const { measures: vseedMeasures = [], dimensions = [] } = advancedVSeed
  const measures = findAllMeasures(vseedMeasures)

  const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
  const hasMeasureEncoding = measures.some((item: Measure) => item.encoding)
  const encoding: Encoding = {}

  if (hasDimensionEncoding) {
    generateDimensionEncoding(dimensions, encoding, measures.length > 1)
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

/**
 * --------------------维度--------------------
 */
const generateDefaultDimensionEncoding = (dimensions: Dimensions, encoding: Encoding) => {
  const onlyMeasureId = dimensions.length === 1 && dimensions.find((item) => item.id === MeasureId)
  const uniqueDimIds: string[] = unique(dimensions.map((d) => d.id))
  encoding.x = uniqueDimIds.slice(0, 1) // 第一个维度放置于X轴
  encoding.y = uniqueDimIds.slice(onlyMeasureId ? 0 : 1) // 第2个维度放置于Y轴
  encoding.color = uniqueDimIds.slice(onlyMeasureId ? 0 : 1) // 第二个之后的维度用于颜色
  encoding.detail = encoding.color
  encoding.tooltip = uniqueDimIds.filter((d) => d !== MeasureId) // 展示指标名称之外的所有维度
  encoding.label = [] // 默认不展示标签
  encoding.row = [] // 默认不进行行透视
  encoding.column = [] // 默认不进行列透视
}
const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding, isMultiMeasure: boolean) => {
  encoding.x = unique(dimensions.filter((item) => item.encoding === 'xAxis').map((item) => item.id))
  // x
  if (encoding.x.length === 0) {
    encoding.x = [dimensions[0].id]
  }
  // y
  encoding.y = unique(dimensions.filter((item) => item.encoding === 'yAxis').map((item) => item.id))
  if (encoding.y.length === 0) {
    if (dimensions.length > 1) {
      encoding.y = dimensions.slice(1).map((item) => item.id)
    } else {
      encoding.y = dimensions.slice(0).map((item) => item.id)
    }
  }
  // color
  addColorToEncoding(dimensions, encoding, isMultiMeasure)

  // detail
  encoding.detail = unique(dimensions.filter((item) => item.encoding === 'detail').map((item) => item.id))
  if (encoding.detail.length === 0) {
    encoding.detail = encoding.color
  }
  // tooltip
  encoding.tooltip = unique(dimensions.map((item) => item.id))
  encoding.tooltip = encoding.tooltip.filter((d) => d !== MeasureId)
  // label
  encoding.label = unique(dimensions.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.label = encoding.label.filter((d) => d !== MeasureId)
}

/**
 * --------------------指标--------------------
 */
const generateDefaultMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  const colorDims = unique(
    measures.filter((item) => item.encoding === 'color' || !item.encoding).map((item) => item.id),
  )
  if (colorDims.length > 0) {
    encoding.color = [colorDims[0]]
  }
}
const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  // color
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = [color[0]]
  }

  // label
  const label = unique(measures.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.label = unique([...(encoding.label || []), ...label])

  // tooltip
  const tooltip = unique(measures.filter((item) => item.encoding === 'tooltip').map((item) => item.id))
  encoding.tooltip = unique([...(encoding.tooltip || []), ...label, ...tooltip])
}
