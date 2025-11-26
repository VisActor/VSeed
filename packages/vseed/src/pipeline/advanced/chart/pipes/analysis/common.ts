import { sort, unique } from 'remeda'
import type { Dataset, Datum } from 'src/types'
import type { Sort } from 'src/types/properties/analysis/sort'

export const calcOrder = (sortConfig: Sort, id: string, dataset: Dataset): string[] => {
  if (sortConfig.customOrder) {
    return sortConfig.customOrder
  }

  const order = sortConfig.order || 'asc'
  const orderBy = sortConfig.orderBy

  const res = sort(dataset, (a, b) => {
    const aValue = a[orderBy || id] as string | number
    const bValue = b[orderBy || id] as string | number

    if (order === 'asc') {
      if (aValue < bValue) {
        return -1
      }
      if (aValue > bValue) {
        return 1
      }
      return 0
    }
    if (aValue > bValue) {
      return -1
    }
    if (aValue < bValue) {
      return 1
    }
    return 0
  })

  return unique(res.map((item: Datum) => item[id] as string))
}
