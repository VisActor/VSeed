import { z } from 'zod'

export const zFoldInfo = z.object({
  foldMap: z.record(z.string(), z.string().or(z.undefined())),
  statistics: z.object({
    min: z.number(),
    max: z.number(),
    sum: z.number(),
    count: z.number(),
    colorMin: z.number(),
    colorMax: z.number(),
  }),
  measureId: z.string(),
  measureName: z.string(),
  measureValue: z.string(),
})
export const zUnfoldInfo = z.object({
  encodingX: z.string(),
  encodingY: z.string(),
  encodingColor: z.string(),
  encodingColorId: z.string(),
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
