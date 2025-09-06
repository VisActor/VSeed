import { z } from 'zod'

export type FoldInfo = {
  foldMap: Record<string, string | undefined>
  measureId: string
  measureName: string
  measureValue: string
}

export type UnfoldInfo = {
  /**
   * @deprecated
   */
  groupName: string
  /**
   * @deprecated
   */
  groupId: string

  encodingX: string
  encodingY: string
  encodingColor: string
  encodingDetail: string
  encodingAngle: string

  colorItems: string[]
  colorIdMap: Record<string, string>
}

export const zFoldInfo = z.object({
  foldMap: z.record(z.string(), z.string().or(z.undefined())),
  measureId: z.string(),
  measureName: z.string(),
  measureValue: z.string(),
})
export const zUnfoldInfo = z.object({
  groupId: z.string(),
  groupName: z.string(),
  encodingX: z.string(),
  encodingY: z.string(),
  encodingColor: z.string(),
  encodingDetail: z.string(),
  encodingAngle: z.string(),
  colorItems: z.array(z.string()),
  colorIdMap: z.record(z.string(), z.string()),
})

export const zDatasetReshapeInfo = z.array(
  z.object({
    id: z.string(),
    index: z.number(),
    foldInfo: zFoldInfo,
    foldInfoList: z.array(zFoldInfo).nullish(),
    unfoldInfo: zUnfoldInfo,
  }),
)

export type DatasetReshapeInfo = z.infer<typeof zDatasetReshapeInfo>
