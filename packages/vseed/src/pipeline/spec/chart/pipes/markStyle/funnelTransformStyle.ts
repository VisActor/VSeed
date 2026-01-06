import type { VChartSpecPipe } from 'src/types'
export const funnelTransformStyle: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed
  const config = advancedVSeed.config?.[chartType as 'funnel']?.transform
  return {
    ...spec,
    transform: {
      style: {
        fill: config?.backgroundColor,
      },
    },
    transformLabel: {
      visible: true,
      style: {
        fill: config?.textColor,
      },
    },
  }
}
