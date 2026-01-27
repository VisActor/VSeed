import type { AdvancedPipe, Table } from 'src/types'

export const page: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { page } = vseed as Table

  if (!page) {
    return advancedVSeed
  }

  const { field, currentValue } = page
  const { dataset } = vseed

  const pagedDataset = dataset.filter((datum) => {
    return datum[field] === currentValue
  })

  context.vseed = {
    ...vseed,
    dataset: pagedDataset,
  }

  return advancedVSeed
}
