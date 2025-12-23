import { z } from 'zod'
export const zInsightType = z.union([z.literal('zScoreMad'), z.literal('zScoreRolling')])

export const zZScoreMad = z.object({
  insightType: z.literal('zScoreMad'),
  measures: z.array(z.string()),
  threshold: z.number().default(2.5).optional(),
})
export const zTidyDatum = z.record(z.string(), z.union([z.number(), z.string(), z.null(), z.boolean()]))
export const zTidyData = z.array(zTidyDatum)

export const zZScoreRolling = z.object({
  insightType: z.literal('zScoreRolling'),
  schema: z.object({
    valueField: z.string(),
    window: z.number().int().positive(),
    outputField: z.string().optional(),
    timeField: z.string().optional(),
    threshold: z.number().default(3),
  }),
})

export const zInsightInfoItem = z.object({
  field: z.string(),
  scoreField: z.string(),
  isAnomalyField: z.string(),
  algorithm: zInsightType,
  params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])),
})
export const zInsightInfo = z.array(zInsightInfoItem)

export const zVInsightDSL = z.discriminatedUnion('insightType', [zZScoreMad, zZScoreRolling])
export const zVInsightResult = z.object({
  dataset: zTidyData,
  insightInfo: zInsightInfo,
})
export type TidyDatum = z.infer<typeof zTidyDatum>
export type TidyData = z.infer<typeof zTidyData>
export type InsightType = z.infer<typeof zInsightType>
export type VInsightDSL = z.infer<typeof zVInsightDSL>
export type InsightInfoItem = z.infer<typeof zInsightInfoItem>
export type InsightInfo = z.infer<typeof zInsightInfo>
export type VInsightResult = z.infer<typeof zVInsightResult>
