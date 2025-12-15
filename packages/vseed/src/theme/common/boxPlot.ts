import type { BoxPlotStyle, OutlierStyle } from 'src/types'

const getCommonBoxPlotStyle = (): BoxPlotStyle => {
  return {
    boxCornerRadius: 2,
  }
}

export const getLightBoxPlotStyle = (): BoxPlotStyle => {
  return {
    ...getCommonBoxPlotStyle(),
    boxBorderColor: '#606773',
    whiskerBorderColor: '#606773',
  }
}

export const getDarkBoxPlotStyle = (): BoxPlotStyle => {
  return {
    ...getCommonBoxPlotStyle(),
    boxBorderColor: '#888C93',
    whiskerBorderColor: '#888C93',
  }
}
const getCommonOutlierStyle = (): OutlierStyle => {
  return {
    pointSize: 10,
    pointBorderWidth: 1.5,
    pointColor: 'transparent',
  }
}

export const getLightOutlierStyle = (): OutlierStyle => {
  return {
    ...getCommonOutlierStyle(),
    pointBorderColor: '#606773',
  }
}

export const getDarkOutlierStyle = (): OutlierStyle => {
  return {
    ...getCommonOutlierStyle(),
    pointBorderColor: '#888C93',
  }
}
