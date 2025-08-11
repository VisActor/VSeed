import type { Datum } from "src/types"

export const isSubset = (sub: Datum, obj: Datum) => {
  return Object.entries(sub).every(([key, value]) => {
    if (typeof value === 'string') {
      return obj[key] === value
    }
    if (typeof value === 'number') {
      return obj[key] === value
    }
    return true
  })
}
