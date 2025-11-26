import type { RegressionLineConfig } from 'src/types/properties/regressionLine'

export const getDefaultRegressionLine = () => {
  return {
    lineWidth: 2,
    textFontSize: 12,
    textFontWeight: 400,
  }
}

export const getLightRegressionLine = (): Partial<RegressionLineConfig> => {
  return {
    kdeRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#364159',
    },
    ecdfRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#364159',
    },
    linearRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#364159',
      confidenceIntervalOpacity: 0.2,
    },
    lowessRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#364159',
      confidenceIntervalOpacity: 0.2,
    },
    polynomialRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#364159',
      confidenceIntervalOpacity: 0.2,
    },
    logisticRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#364159',
      confidenceIntervalOpacity: 0.2,
    },
  }
}

export const getDarkRegressionLine = (): Partial<RegressionLineConfig> => {
  return {
    kdeRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#FFFFFF',
    },
    ecdfRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#FFFFFF',
    },
    linearRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#FFFFFF',
      confidenceIntervalOpacity: 0.2,
    },
    lowessRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#FFFFFF',
      confidenceIntervalOpacity: 0.2,
    },
    polynomialRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#FFFFFF',
      confidenceIntervalOpacity: 0.2,
    },
    logisticRegressionLine: {
      ...getDefaultRegressionLine(),
      textColor: '#FFFFFF',
      confidenceIntervalOpacity: 0.2,
    },
  }
}
