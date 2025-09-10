import { dataReshapeByEncoding, FoldPrimaryMeasureValue, FoldSecondaryMeasureValue } from 'src/dataReshape'
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

export const reshapeWithDualEncoding: AdvancedPipe = (advancedVSeed, context) => {
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
  const primaryMeasures = measures[0] as MeasureGroup
  const secondaryMeasures = (measures[1] || []) as MeasureGroup

  if (primaryMeasures && primaryMeasures.children) {
    const {
      dataset: newDataset,
      foldInfo,
      unfoldInfo,
    } = dataReshapeByEncoding(dataset, dimensions, primaryMeasures.children, encoding as Encoding, {
      foldMeasureValue: FoldPrimaryMeasureValue,
      colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed),
    })

    datasets.push(newDataset)
    foldInfoList.push(foldInfo)
    unfoldInfoList.push(unfoldInfo)
  }

  if (secondaryMeasures && secondaryMeasures.children) {
    const {
      dataset: newDataset,
      foldInfo,
      unfoldInfo,
    } = dataReshapeByEncoding(dataset, dimensions, secondaryMeasures.children, encoding as Encoding, {
      foldMeasureValue: FoldSecondaryMeasureValue,
      colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed),
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
    dataset: datasets,
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
