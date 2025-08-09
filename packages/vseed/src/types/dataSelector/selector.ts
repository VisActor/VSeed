import { z } from 'zod'
import type { Datum } from '../properties'

export type ValueSelector = string | number

export type PartialDatumSelector = Datum

export type MeasureSelector = {
  field: string
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'between'
  value: string | number | Array<string | number>
}

export type DimensionSelector = {
  field: string
  operator: 'in' | 'not in'
  value: string | number | Array<string | number>
}

export type Selector = ValueSelector | PartialDatumSelector | MeasureSelector | DimensionSelector

export type Selectors = Array<Selector>

export const zSelector = z.union([
  z.string(),
  z.number(),
  z.object({
    field: z.string(),
    operator: z.string(),
    value: z.union([z.string(), z.number(), z.array(z.union([z.string(), z.number()]))]),
  }),
  z.object({
    field: z.string(),
    operator: z.string(),
    value: z.union([z.string(), z.number(), z.array(z.union([z.string(), z.number()]))]),
  }),
])

export const zSelectors = z.array(zSelector)