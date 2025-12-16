import type { ISpec } from '@visactor/vchart'
import type { VChartSpecPipe, XBandAxis } from 'src/types'
import { defaultTitleText } from './title/defaultTitleText'
import { MeasureId } from 'src/dataReshape'
import { isArray, isNull } from '@visactor/vutils'
import { bandAxisStyle } from './bandAxisStyle'

export const xBand: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { measures = [], dimensions = [], encoding, datasetReshapeInfo, pivotAllDatasetReshapeInfo } = advancedVSeed
  const config = (advancedVSeed.config?.[chartType as 'column']?.xAxis ?? {}) as XBandAxis

  if (!result.axes) {
    result.axes = []
  }

  const { labelAutoLimitLength = 80 } = config

  const onlyMeasureId = (encoding.x || []).filter((v) => v !== MeasureId).length === 0
  const bandAxis = bandAxisStyle(config)

  bandAxis.orient = 'bottom'
  bandAxis.maxHeight = labelAutoLimitLength + 60
  bandAxis.paddingInner = [0.15, 0.1]
  bandAxis.paddingOuter = [0.075, 0.1]

  if (isNull(bandAxis.title?.text)) {
    bandAxis.title!.text = defaultTitleText(measures, dimensions, encoding.x as string[])
  }

  if (onlyMeasureId && bandAxis.label) {
    const allDatasetReshapeInfo = pivotAllDatasetReshapeInfo || datasetReshapeInfo
    const colorIdMap = allDatasetReshapeInfo.reduce<Record<string, { id: string; alias: string }>>((prev, cur) => {
      return { ...prev, ...cur.unfoldInfo.colorIdMap }
    }, {})

    bandAxis.label.formatMethod = (text: string | string[]) => {
      return isArray(text) ? text : (colorIdMap[String(text)]?.alias ?? text)
    }
  }

  result.axes = [...result.axes, bandAxis] as ISpec['axes']
  return result
}
