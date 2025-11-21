import type { ICartesianCrosshairSpec, ILineChartSpec } from '@visactor/vchart'
import { isNullish } from 'remeda'
import type { DimensionLinkage, PivotChartSpecPipe } from 'src/types'

const defaultScatterFormatter = (val: number | string) => {
  if (isNullish(val)) {
    return ''
  }
  if (typeof val === 'string') {
    return val
  }

  if (val === 0) {
    return '0'
  }
  if (Math.abs(val) < 1) {
    return val.toFixed(2)
  }

  return val === Math.floor(val) ? `${val}` : val.toFixed(1)
}

export const dimensionLinkage: PivotChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed

  const config = (advancedVSeed.config?.[chartType as 'line']?.dimensionLinkage ?? {}) as DimensionLinkage

  if (config.enable === false) {
    return spec
  }

  const indicators = spec.indicators
  const labelHoverOnAxis = {}
  const chartSpec = (indicators as any)?.[0]?.chartSpec as ILineChartSpec
  const crosshair = chartSpec?.crosshair as ICartesianCrosshairSpec

  if (crosshair?.xField) {
    ;(labelHoverOnAxis as any).bottom = {
      visible: config.showLabel ?? crosshair.xField.label?.visible ?? true,
      background: crosshair.xField.label?.labelBackground,
      textStyle: crosshair.xField.label?.style,
      formatMethod: chartType === 'scatter' ? defaultScatterFormatter : undefined,
    }
  }
  if (crosshair?.yField) {
    ;(labelHoverOnAxis as any).left = {
      visible: config.showLabel ?? crosshair.yField.label?.visible ?? true,
      background: crosshair.yField.label?.labelBackground,
      textStyle: crosshair.yField.label?.style,
      formatMethod: chartType === 'scatter' ? defaultScatterFormatter : undefined,
    }
  }

  if (indicators && indicators.length) {
    indicators.forEach((ind) => {
      const crosshair = (ind as any)?.chartSpec?.crosshair as ICartesianCrosshairSpec

      if (crosshair?.xField) {
        crosshair.xField.label = { visible: false }
      }

      if (crosshair?.yField) {
        crosshair.yField.label = { visible: false }
      }
    })
  }

  spec.chartDimensionLinkage = {
    showTooltip: config.showTooltip ?? (chartSpec?.tooltip?.dimension?.visible as boolean) ?? true,
    heightLimitToShowTooltipForLastRow: 60,
    widthLimitToShowTooltipForLastColumn: 90,
    labelHoverOnAxis,
  }

  return spec
}
