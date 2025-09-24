import { dataReshapeByEncoding, FoldXMeasureValue, FoldYMeasureValue } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import { measureDepth } from 'src/pipeline/utils'
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Encoding,
  FoldInfo,
  MeasureGroup,
  UnfoldInfo,
} from 'src/types'

export const pivotReshapeWithScatterEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed as ColumnParallel
  const { dimensions = [], measures = [], encoding, chartType } = advancedVSeed

  const measureGroups: Array<MeasureGroup[]> = []

  const depth = measureDepth(measures)
  if (depth === 3) {
    measures.forEach((measure: MeasureGroup) => {
      measureGroups.push(measure.children as unknown as MeasureGroup[])
    })
  } else if (depth === 2) {
    measureGroups.push(measures)
  }

  const datasetList: Dataset[] = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  measureGroups.forEach((measures: MeasureGroup[], index) => {
    if (measures.length > 2) {
      throw new Error('measures can not be more than 2 groups in scatter')
    }

    const foldInfoList: FoldInfo[] = []
    const unfoldInfoList: UnfoldInfo[] = []

    const datasets: Dataset[] = []
    const xMeasures = measures[0]
    const yMeasures = measures[1] || xMeasures

    if (xMeasures && xMeasures.children) {
      const {
        dataset: newDataset,
        foldInfo,
        unfoldInfo,
      } = dataReshapeByEncoding(dataset, dimensions, xMeasures.children, encoding as Encoding, {
        foldMeasureValue: `${FoldXMeasureValue}${index}`,
        colorItemAsId: true,
        colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
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
        foldMeasureValue: `${FoldYMeasureValue}${index}`,
        colorItemAsId: true,
        colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
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

    const reshapeInfo = {
      id: `${chartType}-${index}`,
      index,
      foldInfo: foldInfoList[0],
      foldInfoList: foldInfoList,
      unfoldInfo: unfoldInfo,
    }

    datasetReshapeInfo.push(reshapeInfo)
    datasetList.push(datasets[0].map((d, index) => ({ ...d, ...(datasets[1]?.[index] || {}) })))
  })

  return {
    ...result,
    dataset: datasetList,
    datasetReshapeInfo: datasetReshapeInfo,
  }
}
