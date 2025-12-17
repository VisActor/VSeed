import { uniqueBy } from 'remeda'
import {
  dataReshapeByEncoding,
  FoldXMeasureId,
  FoldXMeasureValue,
  FoldYMeasureId,
  FoldYMeasureValue,
} from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  Dimension,
  Encoding,
  FoldInfo,
  Measure,
  Measures,
  UnfoldInfo,
} from 'src/types'

export const reshapeWithScatterEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed as ColumnParallel
  const { encoding, chartType, reshapeMeasures } = advancedVSeed
  const dimensions = advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? []

  const measures = reshapeMeasures?.[0] ?? []
  const foldInfoList: FoldInfo[] = []
  const unfoldInfoList: UnfoldInfo[] = []

  const datasets: Dataset[] = []
  const xMeasures = measures.filter((m) => m.encoding === 'xAxis') as Measures
  const yMeasures = measures.filter((m) => m.encoding === 'yAxis') as Measures

  const xResult = dataReshapeByEncoding(
    dataset,
    uniqueBy(dimensions, (d: Dimension) => d.id),
    uniqueBy(xMeasures, (d: Measure) => d.id),
    encoding as Encoding,
    {
      foldMeasureValue: FoldXMeasureValue,
      foldMeasureId: FoldXMeasureId,
      colorItemAsId: true,
      colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
    },
  )

  datasets.push(xResult.dataset)
  foldInfoList.push(xResult.foldInfo)
  unfoldInfoList.push(xResult.unfoldInfo)

  const yResult = dataReshapeByEncoding(
    datasets[0],
    uniqueBy(dimensions, (d: Dimension) => d.id),
    uniqueBy(yMeasures, (d: Measure) => d.id),
    encoding as Encoding,
    {
      foldMeasureValue: FoldYMeasureValue,
      foldMeasureId: FoldYMeasureId,
      colorItemAsId: true,
      colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
    },
  )

  datasets[0] = yResult.dataset
  foldInfoList.push(yResult.foldInfo)
  unfoldInfoList.push(yResult.unfoldInfo)

  const unfoldInfo: UnfoldInfo = {
    ...unfoldInfoList[0],
    colorItems: unfoldInfoList.flatMap((d) => d.colorItems),
    colorIdMap: unfoldInfoList.reduce((prev, cur) => ({ ...prev, ...cur.colorIdMap }), {}),
  }

  return {
    ...result,
    dataset: datasets[0],

    datasetReshapeInfo: [
      {
        id: String(chartType),
        index: 0,
        foldInfo: foldInfoList[0],
        foldInfoList: foldInfoList,
        unfoldInfo: unfoldInfo,
      },
    ],
  }
}
