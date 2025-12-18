import type { ILineSeriesSpec, ISpec } from '@visactor/vchart'
import { createNumFormatter, flatReshapeMeasures } from '../../../../utils'
import type { VChartSpecPipe, YLinearAxis } from 'src/types'
import { createLinearFormat } from './format/linearFormat'
import { linearAxisStyle } from './linearAxisStyle'
import { FoldPrimaryMeasureValue } from 'src/dataReshape'

export const yLinearPrimary: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { datasetReshapeInfo, reshapeMeasures = [] } = advancedVSeed
  const { index, id: reshapeInfoId, foldInfoList } = datasetReshapeInfo[0]
  // TODO: default config missing
  const primaryYAxis = advancedVSeed.config?.[chartType as 'dualAxis']?.primaryYAxis as YLinearAxis | YLinearAxis[]
  const yAxisConfig = Array.isArray(primaryYAxis) ? primaryYAxis[index] || primaryYAxis[0] : primaryYAxis
  const alignTicks = advancedVSeed.config?.[chartType as 'dualAxis']?.alignTicks as boolean | boolean[]
  const alignTicksConfig = Array.isArray(alignTicks) ? alignTicks[index] || alignTicks[0] : alignTicks

  if (!foldInfoList) {
    return result
  }
  const primaryFoldInfoList = foldInfoList!.filter((f) => f.measureValue.startsWith(FoldPrimaryMeasureValue))

  const isEmpty =
    !primaryFoldInfoList.length || primaryFoldInfoList.every((foldInfo) => !Object.keys(foldInfo.foldMap).length)

  const id = `${reshapeInfoId}-primary-axis`

  const seriesId = alignTicksConfig
    ? spec.series!.map((s) => (s as any).id)
    : spec
        .series!.filter((s) => ((s as ILineSeriesSpec).yField as string).startsWith(FoldPrimaryMeasureValue))
        .map((s) => (s as any).id)

  if (!result.axes) {
    result.axes = []
  }

  const { autoFormat, numFormat = {} } = yAxisConfig ?? {}

  const formatter = createNumFormatter(numFormat)

  const formatMethod = (value: string) => {
    return createLinearFormat(value, autoFormat, numFormat, formatter)
  }

  const measures = flatReshapeMeasures(reshapeMeasures)
  const measureIds = primaryFoldInfoList.reduce((res: string[], foldInfo) => {
    Object.keys(foldInfo.foldMap).forEach((k) => {
      if (!res.includes(k)) {
        res.push(k)
      }
    })
    return res
  }, [])
  const titleText =
    yAxisConfig?.title?.titleText ||
    measures
      .filter((m) => m.encoding === 'primaryYAxis' && measureIds.includes(m.id))
      .map((m) => m.alias ?? m.id)
      .join(' & ')

  const linearAxis = {
    ...linearAxisStyle({
      ...yAxisConfig,
      orient: 'left',
      formatMethod,
      titleText,
      id,
      seriesId,
    }),
    visible: isEmpty ? false : (yAxisConfig?.visible ?? true),
  }

  result.axes = [...result.axes, linearAxis] as ISpec['axes']

  return result
}
