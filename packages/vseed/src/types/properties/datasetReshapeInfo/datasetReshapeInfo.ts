export type FoldInfo = {
  foldMap: Record<string, string | undefined>
  colorRange: [number, number]
  measureRange: [number, number]

  measureId: string
  measureName: string
  measureValue: string
}

export type UnfoldInfo = {
  encodingX: string
  encodingY: string
  encodingColor: string
  encodingColorId: string
  encodingDetail: string
  encodingAngle: string

  colorItems: string[]
  colorIdMap: Record<string, string>
}

export type DatasetReshapeInfo = Array<{
  id: string
  index: number
  foldInfo: FoldInfo
  foldInfoList?: FoldInfo[]
  unfoldInfo: UnfoldInfo
}>
