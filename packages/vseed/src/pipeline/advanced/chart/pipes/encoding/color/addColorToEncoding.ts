import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import type { Dimensions, Encoding } from 'src/types'

/**
 * @description 为 encoding 添加 color 编码, 多指标场景, 会将 MeasureName 也添加到 color 编码中.
 * @param dimensions
 * @param encoding
 * @param isMultiMeasure
 */
export const addColorToEncoding = (dimensions: Dimensions, encoding: Encoding, isMultiMeasure: boolean) => {
  encoding.color = unique(dimensions.filter((item) => item.encoding === 'color').map((item) => item.id))
  const measureName = dimensions.find((item) => item.id === MeasureName)
  if (isMultiMeasure && measureName && !measureName.encoding) {
    encoding.color.push(MeasureName)
  }
  if (encoding.color.length === 0) {
    encoding.color = [MeasureName]
  }
}
