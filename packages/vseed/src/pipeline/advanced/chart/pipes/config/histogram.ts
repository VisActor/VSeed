/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { pick } from 'remeda'
import { BinEndMeasureId, BinStartMeasureId } from 'src/dataReshape'
import { replaceNullToUndefined } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed, Config, Dimension } from 'src/types'

export const histogramConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }
  const hasColorEncoding = (advancedVSeed?.dimensions || []).find((field: Dimension) => field?.encoding === 'color')

  const pickedConfig = pick(vseed, [
    'backgroundColor',
    'color',
    'label',
    'legend',
    'tooltip',
    'xAxis',
    'yAxis',
    'crosshairRect',
    'binCount',
    'binStep',
    'binValueType',
  ]) as Config['histogram']

  let config = replaceNullToUndefined(pickedConfig)

  if (!hasColorEncoding && !config?.legend?.enable) {
    config = {
      ...config,
      legend: {
        ...config?.legend,
        enable: false,
      },
    }
  }
  result.config = {
    ...(result.config || {}),
    [chartType]: {
      ...config,
    },
  }

  return result as AdvancedVSeed
}

export const histogramXAxisConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }
  const { dataset = [] } = advancedVSeed
  const flattenDatasert = dataset.flat()
  const minValue = Math.min(...flattenDatasert.map((v) => +v[BinStartMeasureId]))
  const maxValue = Math.max(...flattenDatasert.map((v) => +v[BinEndMeasureId]))

  const chartConfig = result.config?.[chartType] as any
  result.config = {
    ...(result.config || {}),
    [chartType]: {
      ...chartConfig,
      xAxis: {
        min: Number.isNaN(minValue) ? undefined : minValue,
        max: Number.isNaN(maxValue) ? undefined : maxValue,
        ...(chartConfig?.xAxis || {}),
      },
    },
  }

  return result as AdvancedVSeed
}
