import { unique } from 'remeda'
import { MeasureId } from 'src/dataReshape'
import type { Dimensions, Encoding } from 'src/types'

/**
 * @description 为 encoding 添加 color 编码, 多指标场景, 会将 MeasureId 也添加到 color 编码中.
 * @param dimensions
 * @param encoding
 * @param isMultiMeasure
 */
export const addColorToEncoding = (dimensions: Dimensions, encoding: Encoding, isMultiMeasure: boolean) => {
  encoding.color = unique(dimensions.filter((item) => item.encoding === 'color').map((item) => item.id))
  const measureId = dimensions.find((item) => item.id === MeasureId)
  if (isMultiMeasure && measureId && !measureId.encoding) {
    encoding.color.push(MeasureId)
  }
  if (encoding.color.length === 0) {
    encoding.color = [MeasureId]
  }
}
