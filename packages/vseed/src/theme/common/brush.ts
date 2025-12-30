import type { BrushConfig } from 'src/types'

export const getLightBrushConfig = (): BrushConfig => ({
  enable: false,
  inBrushStyle: {
    opacity: 1,
  },
  outOfBrushStyle: {
    opacity: 0.2,
  },
})

export const getDarkBrushConfig = (): BrushConfig => ({
  enable: false,
  inBrushStyle: {
    opacity: 1,
  },
  outOfBrushStyle: {
    opacity: 0.25,
  },
})
