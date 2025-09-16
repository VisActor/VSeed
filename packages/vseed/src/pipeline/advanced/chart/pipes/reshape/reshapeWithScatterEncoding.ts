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
  Encoding,
  FoldInfo,
  MeasureGroup,
  UnfoldInfo,
} from 'src/types'

export const reshapeWithScatterEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed as ColumnParallel
  const { dimensions = [], measures = [], encoding, chartType } = advancedVSeed

  if (measures.length > 2) {
    throw new Error('measures can not be more than 2 groups in scatter')
  }
  const foldInfoList: FoldInfo[] = []
  const unfoldInfoList: UnfoldInfo[] = []

  const datasets: Dataset[] = []
  const xMeasures = measures[0] as MeasureGroup
  const yMeasures = (measures[1] || xMeasures) as MeasureGroup

  if (xMeasures && xMeasures.children) {
    const {
      dataset: newDataset,
      foldInfo,
      unfoldInfo,
    } = dataReshapeByEncoding(
      dataset,
      uniqueBy(dimensions, (d) => d.id),
      uniqueBy(xMeasures.children, (d) => d.id),
      encoding as Encoding,
      {
        foldMeasureValue: FoldXMeasureValue,
        foldMeasureId: FoldXMeasureId,
        colorItemAsId: true,
        colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed),
      },
    )

    datasets.push(newDataset)
    foldInfoList.push(foldInfo)
    unfoldInfoList.push(unfoldInfo)
  }

  if (yMeasures && yMeasures.children) {
    const {
      dataset: newDataset,
      foldInfo,
      unfoldInfo,
    } = dataReshapeByEncoding(
      datasets[0],
      uniqueBy(dimensions, (d) => d.id),
      uniqueBy(yMeasures.children, (d) => d.id),
      encoding as Encoding,
      {
        foldMeasureValue: FoldYMeasureValue,
        foldMeasureId: FoldYMeasureId,
        colorItemAsId: true,
        colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed),
      },
    )

    datasets[0] = newDataset
    foldInfoList.push(foldInfo)
    unfoldInfoList.push(unfoldInfo)
  }

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
