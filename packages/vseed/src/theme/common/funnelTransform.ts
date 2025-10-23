import type { FunnelTransformConfig } from 'src/types/properties/config/funnelTransform'

export const getLightFunnelTransformTheme = (): FunnelTransformConfig => {
  return {
    backgroundColor: '#EAEBEC',
    textColor: '#595959',
  }
}

export const getDarkFunnelTransformTheme = (): FunnelTransformConfig => {
  return {
    backgroundColor: '#404349',
    textColor: '#888C93',
  }
}
