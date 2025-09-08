import { dataReshapeByEncoding, FoldPrimaryMeasureValue, FoldSecondaryMeasureValue } from 'src/dataReshape'
import type { AdvancedPipe, ColumnParallel, Dataset, Encoding, FoldInfo, MeasureGroup, UnfoldInfo } from 'src/types'

export const reshapeWithScatterEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed as ColumnParallel
  const { dimensions, measures, encoding, chartType } = advancedVSeed

  if (!measures || !dimensions || !dataset || !encoding) {
    return result
  }

  if (measures.length === 0) {
    throw new Error('measures can not be empty')
  }

  if (measures.length > 2) {
    throw new Error('measures can not be more than 2')
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
    } = dataReshapeByEncoding(dataset, dimensions, xMeasures.children, encoding as Encoding, {
      foldMeasureValue: FoldPrimaryMeasureValue,
      colorItemAsId: true,
    })

    datasets.push(newDataset)
    foldInfoList.push(foldInfo)
    unfoldInfoList.push(unfoldInfo)
  }

  if (yMeasures && yMeasures.children) {
    const {
      dataset: newDataset,
      foldInfo,
      unfoldInfo,
    } = dataReshapeByEncoding(dataset, dimensions, yMeasures.children, encoding as Encoding, {
      foldMeasureValue: FoldSecondaryMeasureValue,
      colorItemAsId: true,
    })

    datasets.push(newDataset)
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
    dataset: datasets[0].map((d, index) => ({ ...d, ...(datasets[1]?.[index] || {}) })),

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
