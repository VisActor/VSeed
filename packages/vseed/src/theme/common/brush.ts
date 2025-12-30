import type { BrushConfig } from 'src/types'

export const getLightBrushConfig = (): BrushConfig => ({
  enable: false,
  inBrushStyle: {
    opacity: 1,
    stroke: '#000',
    lineWidth: 2,
  },
  outOfBrushStyle: {
    opacity: 0.2,
  },
})

export const getDarkBrushConfig = (): BrushConfig => ({
  enable: false,
  inBrushStyle: {
    opacity: 1,
    stroke: '#fff',
    lineWidth: 2,
  },
  outOfBrushStyle: {
    opacity: 0.25,
  },
})
