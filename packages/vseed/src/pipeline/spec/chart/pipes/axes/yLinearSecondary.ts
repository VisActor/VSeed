import type { ISpec } from '@visactor/vchart'
import { createNumFormatter, flatReshapeMeasures } from '../../../../utils'
import type { VChartSpecPipe, YLinearAxis } from 'src/types'
import { isEmpty, isNullish } from 'remeda'
import { createLinearFormat } from './format/linearFormat'
import { linearAxisStyle } from './linearAxisStyle'

export const yLinearSecondary: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { datasetReshapeInfo, reshapeMeasures = [] } = advancedVSeed
  const { index, id: reshapeInfoId, foldInfoList } = datasetReshapeInfo[0]
  // TODO: default config missing
  const secondaryYAxis = advancedVSeed.config?.[chartType as 'dualAxis']?.secondaryYAxis as YLinearAxis | YLinearAxis[]
  const yAxisConfig = Array.isArray(secondaryYAxis) ? secondaryYAxis[index] || secondaryYAxis[0] : secondaryYAxis
  const alignTicks = advancedVSeed.config?.[chartType as 'dualAxis']?.alignTicks as boolean | boolean[]
  const alignTicksConfig = Array.isArray(alignTicks) ? alignTicks[index] || alignTicks[0] : alignTicks

  if (isNullish(foldInfoList?.[1])) {
    return result
  }

  const isEmptySecondary = isEmpty(foldInfoList?.[1].foldMap)
  const onlySecondary = isEmpty(foldInfoList?.[0].foldMap) && !isEmptySecondary

  const sync = {
    axisId: `${reshapeInfoId}-primary-axis`,
    zeroAlign: true,
  }

  const id = `${reshapeInfoId}-secondary-axis`
  const seriesIds = [`${reshapeInfoId}-primary-series`, `${reshapeInfoId}-secondary-series`]
  const seriesId = alignTicksConfig ? seriesIds : seriesIds[1]
  if (!result.axes) {
    result.axes = []
  }

  const { autoFormat, numFormat = {} } = yAxisConfig ?? {}

  const formatter = createNumFormatter(numFormat)

  const formatMethod = (value: string) => {
    return createLinearFormat(value, autoFormat, numFormat, formatter)
  }
  const measures = flatReshapeMeasures(reshapeMeasures)
  const titleText =
    yAxisConfig?.title?.titleText ||
    measures
      .filter((m) => m.encoding === 'secondaryYAxis')
      .map((m) => m.alias ?? m.id)
      .join(' & ')

  const baseStyle = linearAxisStyle({
    ...yAxisConfig,
    orient: 'right',
    formatMethod,
    titleText,
    id,
    seriesId,
    sync,
  })

  const linearAxis = {
    ...baseStyle,
    visible: isEmptySecondary ? false : (yAxisConfig?.visible ?? true),

    grid: {
      ...baseStyle.grid,
      visible: onlySecondary ? true : yAxisConfig?.grid?.visible,
    },
  }

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
