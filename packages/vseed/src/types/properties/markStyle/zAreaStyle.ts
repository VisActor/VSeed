import { z } from 'zod'
import { zSelector, zSelectors } from '../../dataSelector'

export const zAreaStyle = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  areaVisible: z.boolean().nullish(),
  areaColor: z.string().nullish(),
  areaColorOpacity: z.number().nullish(),
})
