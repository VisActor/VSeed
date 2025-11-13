import type { Datum } from 'src/types'

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

export const ANNOTATION_AREA_TEXT_STYLE_BY_POSITION = {
  top: {
    textAlign: 'center',
    textBaseline: 'top',
  },
  topRight: {
    textAlign: 'right',
    textBaseline: 'top',
  },
  topLeft: {
    textAlign: 'left',
    textBaseline: 'top',
  },
  bottom: {
    textAlign: 'center',
    textBaseline: 'bottom',
  },
  bottomLeft: {
    textAlign: 'left',
    textBaseline: 'bottom',
  },
  bottomRight: {
    textAlign: 'right',
    textBaseline: 'bottom',
  },
  left: {
    textAlign: 'left',
    textBaseline: 'middle',
  },
  right: {
    textAlign: 'right',
    textBaseline: 'middle',
  },
}
