import type { BoxPlotStyle, OutlierStyle } from 'src/types'

export const getLightBoxPlotStyle = (): BoxPlotStyle => {
  return {
    boxBorderColor: '#e3e5eb',
  }
}

export const getDarkBoxPlotStyle = (): BoxPlotStyle => {
  return {
    boxBorderColor: '#4b4e53',
  }
}

export const getLightOutlierStyle = (): OutlierStyle => {
  return {
    pointColor: '#8F959E',
  }
}

export const getDarkOutlierStyle = (): OutlierStyle => {
  return {
    pointColor: '#36393e',
  }
}
