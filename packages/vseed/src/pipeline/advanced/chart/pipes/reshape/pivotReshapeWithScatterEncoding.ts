import { unique } from 'remeda'
import {
  dataReshapeByEncoding,
  FoldXMeasureId,
  FoldXMeasureValue,
  FoldYMeasureId,
  FoldYMeasureValue,
  ORIGINAL_DATA,
} from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Encoding,
  FoldInfo,
  Measure,
  UnfoldInfo,
} from 'src/types'

export const pivotReshapeWithScatterEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed as ColumnParallel
  const { encoding, chartType } = advancedVSeed
  const reshapeMeasures = advancedVSeed.reshapeMeasures ?? []
  const dimensions = advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? []
  let allMeasuresIds = unique(reshapeMeasures.flatMap((measureGroup) => measureGroup.map((m) => m.id)))

  if (encoding?.size?.length) {
    allMeasuresIds = allMeasuresIds.filter((mId) => !encoding.size!.includes(mId))
  }

  const datasetList: Dataset[] = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  reshapeMeasures.forEach((measures: Measure[], index) => {
    const foldInfoList: FoldInfo[] = []
    const unfoldInfoList: UnfoldInfo[] = []

    const datasets: Dataset[] = []
    const xMeasures = measures.filter((m) => m.encoding === 'xAxis')
    const yMeasures = measures.filter((m) => m.encoding === 'yAxis')

    const xResult = dataReshapeByEncoding(dataset, dimensions, xMeasures, encoding as Encoding, {
      foldMeasureValue: `${FoldXMeasureValue}${index}`,
      foldMeasureId: FoldXMeasureId,
      colorItemAsId: true,
      colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
      omitIds: allMeasuresIds,
    })

    datasets.push(xResult.dataset)
    foldInfoList.push(xResult.foldInfo)
    unfoldInfoList.push(xResult.unfoldInfo)

    const yResult = dataReshapeByEncoding(dataset, dimensions, yMeasures, encoding as Encoding, {
      foldMeasureValue: `${FoldYMeasureValue}${index}`,
      foldMeasureId: FoldYMeasureId,
      colorItemAsId: true,
      colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
      omitIds: allMeasuresIds,
    })

    datasets.push(yResult.dataset)
    foldInfoList.push(yResult.foldInfo)
    unfoldInfoList.push(yResult.unfoldInfo)

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
    datasetList.push(
      datasets[0].flatMap((d) => {
        return datasets[1]
          .filter((yDatum) => {
            return yDatum[ORIGINAL_DATA] === d[ORIGINAL_DATA]
          })
          .map((yDatum) => {
            return {
              ...d,
              ...yDatum,
            }
          })
      }),
    )
  })

  return {
    ...result,
    dataset: datasetList,
    datasetReshapeInfo: datasetReshapeInfo,
  }
}
