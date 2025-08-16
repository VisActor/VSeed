export const canConvertToNumber = (val: string | number | null | undefined | object) => {
  if (val === null || val === undefined) {
    return false
  }
  if (typeof val === 'number') {
    return true
  }
  if (typeof val === 'string') {
    const num = Number(val)
    return !isNaN(num)
  }
  if (typeof val === 'object') {
    return false
  }
  return false
}
