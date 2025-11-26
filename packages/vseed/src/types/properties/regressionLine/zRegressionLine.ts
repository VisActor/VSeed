import { z } from 'zod'

export const zEcdfRegressionLine = z.object({
  enable: z.boolean().nullish(),
  color: z.string().nullish(),
  lineWidth: z.number().nullish(),
  lineDash: z.array(z.number()).nullish(),
  text: z.string().nullish(),
  textColor: z.string().nullish(),
  textFontSize: z.number().nullish(),
  textFontWeight: z.number().nullish(),
})

export const zKdeRegressionLine = zEcdfRegressionLine.extend({})

export const zLinearRegressionLine = zEcdfRegressionLine.extend({
  confidenceIntervalVisible: z.boolean().nullish(),
  confidenceIntervalColor: z.string().nullish(),
  confidenceIntervalOpacity: z.number().nullish(),
})

export const zLogisticRegressionLine = zLinearRegressionLine.extend({})
export const zLowessRegressionLine = zLinearRegressionLine.extend({})

export const zPolynomialRegressionLine = zLinearRegressionLine.extend({
  degree: z.number().nullish(),
})

export const zRegressionLine = z.object({
  ecdfRegressionLine: zEcdfRegressionLine.or(z.array(zEcdfRegressionLine)).nullish(),
  kdeRegressionLine: zKdeRegressionLine.or(z.array(zKdeRegressionLine)).nullish(),
  linearRegressionLine: zLinearRegressionLine.or(z.array(zLinearRegressionLine)).nullish(),
  lowessRegressionLine: zLowessRegressionLine.or(z.array(zLowessRegressionLine)).nullish(),
  polynomialRegressionLine: zPolynomialRegressionLine.or(z.array(zPolynomialRegressionLine)).nullish(),
  logisticRegressionLine: zLogisticRegressionLine.or(z.array(zLogisticRegressionLine)).nullish(),
})

export type RegressionLineConfig = z.infer<typeof zRegressionLine>
