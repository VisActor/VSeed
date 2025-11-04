import type { HistogramRegressionLine } from 'src/types/properties/regressionLine'

export const getDefaultHistogramRegressionLine = (): Partial<HistogramRegressionLine> => {
  return {
    lineWidth: 2,
    textFontSize: 12,
    textFontWeight: 400,
  }
}

export const getLightHistogramRegressionLine = (): Partial<HistogramRegressionLine> => {
  return {
    ...getDefaultHistogramRegressionLine(),
    textColor: '#364159',
  }
}

export const getDarkHistogramRegressionLine = (): Partial<HistogramRegressionLine> => {
  return {
    ...getDefaultHistogramRegressionLine(),
    textColor: '#ffffff',
  }
}
