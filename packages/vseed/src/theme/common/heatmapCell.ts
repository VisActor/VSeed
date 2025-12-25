import type { HeatmapCell } from 'src/types/properties/config/heatmap/heatmap'

export const getLightHeatmapCellTheme = (): HeatmapCell => {
  return {
    stroke: '#fff',
    hoverShadowColor: '#404349',
  }
}

export const getDarkHeatmapCellTheme = (): HeatmapCell => {
  return {
    stroke: '#404349',
    hoverShadowColor: '#404349',
  }
}
