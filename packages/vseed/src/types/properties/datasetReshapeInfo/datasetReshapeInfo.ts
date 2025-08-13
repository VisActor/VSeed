import { z } from 'zod'

export type FoldInfo = {
  foldMap: Record<string, string | undefined>
  measureId: string
  measureName: string
  measureValue: string
}

export type UnfoldInfo = {
  groupName: string
  groupId: string
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
  colorItems: z.array(z.string()),
  groupId: z.string(),
  colorIdMap: z.record(z.string(), z.string()),
  groupName: z.string(),
})

export const zDatasetReshapeInfo = z.array(
  z.object({
    id: z.string(),
    foldInfo: zFoldInfo,
    unfoldInfo: zUnfoldInfo,
  }),
)

export type DatasetReshapeInfo = z.infer<typeof zDatasetReshapeInfo>
