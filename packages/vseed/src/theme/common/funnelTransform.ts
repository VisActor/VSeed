import type { FunnelTransformConfig } from 'src/types/properties/config/funnelTransform'

export const getLightFunnelTransformTheme = (): FunnelTransformConfig => {
  return {
    backgroundColor: '#F6F7F9',
    textColor: '#737880',
  }
}

export const getDarkFunnelTransformTheme = (): FunnelTransformConfig => {
  return {
    backgroundColor: '#2A2D33',
    textColor: '#888C93',
  }
}
