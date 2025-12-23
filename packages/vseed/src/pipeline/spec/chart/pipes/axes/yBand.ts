import type { ISpec } from '@visactor/vchart'
import type { VChartSpecPipe, XBandAxis } from 'src/types'
import { defaultTitleText } from './title/defaultTitleText'
import { MeasureId } from 'src/dataReshape'
import { isArray, isNil } from '@visactor/vutils'
import { bandAxisStyle } from './bandAxisStyle'

export const yBand: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ISpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const { measures = [], dimensions = [], encoding, datasetReshapeInfo, pivotAllDatasetReshapeInfo } = advancedVSeed
  const config = (advancedVSeed.config?.[chartType as 'bar']?.yAxis ?? {}) as XBandAxis

  if (!result.axes) {
    result.axes = []
  }

  const { labelAutoLimitLength = 80 } = config

  const onlyMeasureId = (encoding.y || []).filter((v: string) => v !== MeasureId).length === 0

  const bandAxis = bandAxisStyle(config)

  bandAxis.type = 'band'
  bandAxis.orient = 'left'
  bandAxis.maxWidth = labelAutoLimitLength + 60
  if (bandAxis.label) {
    bandAxis.label.containerAlign = 'right'
  }
  bandAxis.paddingInner = [0.15, 0.1]
  bandAxis.paddingOuter = [0.075, 0.1]

  if (isNil(bandAxis.title?.text)) {
    bandAxis.title!.text = defaultTitleText(measures, dimensions, encoding.y as string[])
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
