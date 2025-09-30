import type { Legend } from 'src/types'

export const getDefaultLegend = (): Legend => ({
  enable: true,
  border: true,
  maxSize: 1,
  shapeType: 'rectRound',
  position: 'rt',
  labelColor: '#646A73',
  labelFontSize: 12,
  labelFontWeight: 400,
})
