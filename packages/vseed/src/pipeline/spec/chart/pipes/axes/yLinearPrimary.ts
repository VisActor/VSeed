import type { ISpec } from '@visactor/vchart'
import { createNumFormatter } from '../../../../utils'
import type { VChartSpecPipe, YLinearAxis } from 'src/types'
import { isEmpty, isNullish } from 'remeda'
import { createLinearFormat } from './format/linearFormat'
import { defaultTitleText } from './title/defaultTitleText'
import { linearAxisStyle } from './linearAxisStyle'

export const yLinearPrimary: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { datasetReshapeInfo, encoding, measures, dimensions } = advancedVSeed
  const { index, id: reshapeInfoId, foldInfoList } = datasetReshapeInfo[0]
  // TODO: default config missing
  const primaryYAxis = advancedVSeed.config?.[chartType as 'dualAxis']?.primaryYAxis as YLinearAxis | YLinearAxis[]
  const yAxisConfig = Array.isArray(primaryYAxis) ? primaryYAxis[index] || primaryYAxis[0] : primaryYAxis
  const alignTicks = advancedVSeed.config?.[chartType as 'dualAxis']?.alignTicks as boolean | boolean[]
  const alignTicksConfig = Array.isArray(alignTicks) ? alignTicks[index] || alignTicks[0] : alignTicks

  if (isNullish(foldInfoList?.[0])) {
    return result
  }

  const isEmptySecondary = isEmpty(foldInfoList?.[0].foldMap)

  const id = `${reshapeInfoId}-primary-axis`
  const seriesIds = [`${reshapeInfoId}-primary-series`, `${reshapeInfoId}-secondary-series`]
  const seriesId = alignTicksConfig ? seriesIds : seriesIds[0]

  if (!result.axes) {
    result.axes = []
  }

  const { autoFormat, numFormat = {} } = yAxisConfig ?? {}

  const formatter = createNumFormatter(numFormat)

  const formatMethod = (value: string) => {
    return createLinearFormat(value, autoFormat, numFormat, formatter)
  }

  const titleText = yAxisConfig?.title?.titleText || defaultTitleText(measures, dimensions, encoding.y as string[])

  const linearAxis = {
    ...linearAxisStyle({
      ...yAxisConfig,
      orient: 'left',
      formatMethod,
      titleText,
      id,
      seriesId,
    }),
    visible: isEmptySecondary ? false : (yAxisConfig?.visible ?? true),
  }

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
