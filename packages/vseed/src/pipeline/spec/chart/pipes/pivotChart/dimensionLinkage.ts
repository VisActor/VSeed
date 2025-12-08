import type { ICartesianCrosshairSpec, ILineChartSpec } from '@visactor/vchart'
import type { DimensionLinkage, PivotChartSpecPipe } from 'src/types'

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
    const labelFormat = crosshair.xField.label?.formatMethod
    ;(labelHoverOnAxis as any).bottom = {
      visible: config.showLabel ?? crosshair.xField.label?.visible ?? true,
      background: crosshair.xField.label?.labelBackground,
      textStyle: crosshair.xField.label?.style,
      formatMethod: labelFormat
        ? (text: string | string[] | number) => (text || text === 0 ? labelFormat(text) : null)
        : undefined,
    }
  }
  if (crosshair?.yField) {
    const labelFormat = crosshair.yField.label?.formatMethod
    ;(labelHoverOnAxis as any).left = {
      visible: config.showLabel ?? crosshair.yField.label?.visible ?? true,
      background: crosshair.yField.label?.labelBackground,
      textStyle: crosshair.yField.label?.style,
      formatMethod: labelFormat
        ? (text: string | string[] | number) => (text || text === 0 ? labelFormat(text) : null)
        : undefined,
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
    heightLimitToShowTooltipForEdgeRow: (spec.defaultRowHeight as number) / 2,
    widthLimitToShowTooltipForEdgeColumn: (spec.defaultColWidth as number) / 2,
    labelHoverOnAxis,
  }

  return spec
}
