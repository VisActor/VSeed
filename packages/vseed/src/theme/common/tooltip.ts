import type { TooltipConfig } from 'src/types'

const getDefaultTooltip = (): TooltipConfig => ({
  enable: true,
  borderRadius: 12,
  borderWidth: 1,
  padding: 9,
  lineHeight: 12,
  fontSize: 12,
  lineSpace: 6,
})

export const getLightTooltip = (): TooltipConfig => ({
  ...getDefaultTooltip(),
  borderColor: '#e3e5e8',
  backgroundColor: '#fff',
  keyColor: '#606773',
  valueColor: '#21252c',
  titleColor: '#21252c',
})

export const getDarkTooltip = (): TooltipConfig => ({
  ...getDefaultTooltip(),
  borderColor: '#3c3f44',
  backgroundColor: '#2b2d30',
  keyColor: '#89909D',
  valueColor: '#E2E3E6',
  titleColor: '#E2E3E6',
})
