import { pick } from 'remeda'
import { replaceNullToUndefined } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed } from 'src/types'

export const cellStyle: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context

  const pickedCellStyle = pick(vseed, ['bodyCellStyle']) as AdvancedVSeed['cellStyle']

  const style = replaceNullToUndefined(pickedCellStyle)

  return { ...advancedVSeed, cellStyle: style }
}
