import type { BoxPlotStyle, OutlierStyle } from 'src/types'

const getCommonBoxPlotStyle = (): BoxPlotStyle => {
  return {
    boxCornerRadius: 6,
  }
}

export const getLightBoxPlotStyle = (): BoxPlotStyle => {
  return {
    ...getCommonBoxPlotStyle(),
    boxBorderColor: '#00000042',
  }
}

export const getDarkBoxPlotStyle = (): BoxPlotStyle => {
  return {
    ...getCommonBoxPlotStyle(),
    boxBorderColor: '#ffffff42',
  }
}
const getCommonOutlierStyle = (): OutlierStyle => {
  return {
    pointBorderWidth: 2,
    pointColor: 'transparent',
  }
}

export const getLightOutlierStyle = (): OutlierStyle => {
  return {
    ...getCommonOutlierStyle(),
  }
}

export const getDarkOutlierStyle = (): OutlierStyle => {
  return {
    ...getCommonOutlierStyle(),
  }
}
