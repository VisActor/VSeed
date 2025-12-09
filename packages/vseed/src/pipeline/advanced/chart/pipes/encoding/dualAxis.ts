import { unique } from 'remeda'
import { MeasureId } from 'src/dataReshape'
import { findAllMeasures, measureDepth } from 'src/pipeline/utils'
import type {
  AdvancedPipe,
  Dimension,
  Dimensions,
  Encoding,
  Measure,
  MeasureGroup,
  Measures,
  MeasureTree,
} from 'src/types'
import { addColorToEncoding } from './color'
import { addDefaultColorEncoding } from './color/addColorToEncoding'

const checkSingleViewMultiMeasures = (measures: MeasureTree = []): boolean => {
  return measures.length <= 1 && ((measures[0] as MeasureGroup).children ?? []).length <= 1
}

const hasMultipleMeasureInSingleView = (measures: MeasureTree = []): boolean => {
  const depth = measureDepth(measures)

  if (depth >= 3) {
    return measures.some(
      (m) => m && (m as MeasureGroup).children && !checkSingleViewMultiMeasures((m as MeasureGroup).children),
    )
  }

  if (depth === 2) {
    return !checkSingleViewMultiMeasures(measures)
  }

  if (depth === 1) {
    return measures.length >= 1
  }

  return false
}

export const defaultEncodingForDualAxis: AdvancedPipe = (advancedVSeed) => {
  const { measures: vseedMeasures = [], dimensions = [] } = advancedVSeed
  const measures = findAllMeasures(vseedMeasures)
  const encoding: Encoding = {}
  generateDefaultDimensionEncoding(dimensions, encoding, hasMultipleMeasureInSingleView(vseedMeasures))
  generateDefaultMeasureEncoding(measures, encoding)
  return { ...advancedVSeed, encoding }
}

export const encodingForDualAxis: AdvancedPipe = (advancedVSeed) => {
  const { measures: vseedMeasures = [], dimensions = [] } = advancedVSeed
  const measures = findAllMeasures(vseedMeasures)

  const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
  const hasMeasureEncoding = measures.some((item: Measure) => item.encoding)
  const encoding: Encoding = {}
  const hasMulti = hasMultipleMeasureInSingleView(vseedMeasures)

  if (hasDimensionEncoding) {
    generateDimensionEncoding(dimensions, encoding, hasMulti)
  } else {
    generateDefaultDimensionEncoding(dimensions, encoding, hasMulti)
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
const generateDefaultDimensionEncoding = (dimensions: Dimensions, encoding: Encoding, isMultiMeasure: boolean) => {
  const uniqueDimIds: string[] = unique(dimensions.map((d) => d.id))
  encoding.x = uniqueDimIds.slice(0, 1) // 第一个维度放置于X轴
  addDefaultColorEncoding(uniqueDimIds, encoding, isMultiMeasure)
  encoding.detail = encoding.color
  encoding.tooltip = uniqueDimIds.filter((d) => d !== MeasureId) // 展示指标名称之外的所有维度
  encoding.label = [] // 默认不展示标签
  encoding.row = [] // 默认不进行行透视
  encoding.column = [] // 默认不进行列透视
}
const generateDimensionEncoding = (dimensions: Dimensions, encoding: Encoding, isMultiMeasure: boolean) => {
  // x
  encoding.x = unique(dimensions.filter((item) => item.encoding === 'xAxis').map((item) => item.id))
  if (encoding.x.length === 0) {
    encoding.x = [dimensions[0].id]
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
  encoding.y = unique(
    measures
      .filter((item) => item.encoding === 'primaryYAxis' || item.encoding === 'secondaryYAxis' || !item.encoding)
      .map((item) => item.id),
  )
}
const generateMeasureEncoding = (measures: Measures, encoding: Encoding) => {
  // y
  encoding.y = unique(
    measures
      .filter((item) => item.encoding === 'primaryYAxis' || item.encoding === 'secondaryYAxis' || !item.encoding)
      .map((item) => item.id),
  )

  // color
  const color = unique(measures.filter((item) => item.encoding === 'color').map((item) => item.id))
  if (color.length > 0) {
    encoding.color = color
  }

  // label
  const label = unique(measures.filter((item) => item.encoding === 'label').map((item) => item.id))
  encoding.label = unique([...(encoding.label || []), ...label])

  // tooltip
  const tooltip = unique(measures.filter((item) => item.encoding === 'tooltip').map((item) => item.id))
  encoding.tooltip = unique([...(encoding.tooltip || []), ...label, ...tooltip])
}
