import { isEmpty } from 'remeda'
import type { VSeed } from 'src/types'

export const checkVSeed = (vseed: VSeed) => {
  const { chartType, dataset, dimensions, measures } = vseed
  if (!chartType) {
    throw new Error('chartType is required')
  }
  if (!dataset || isEmpty(dataset)) {
    throw new Error('dataset is required, and must be an array')
  }
  if (dimensions && !Array.isArray(dimensions)) {
    throw new Error('dimensions must be an array')
  }
  if (measures && !Array.isArray(measures)) {
    throw new Error('measures must be an array')
  }
}
