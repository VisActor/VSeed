import type { Datum } from '@visactor/vchart'

export const defaultRegressionLineColor = (datum: Datum, ctx: any, opt: any): string | undefined => {
  const parentNode = opt.mark?._product?.parent
  if (parentNode?.attribute?.data) {
    return parentNode.attribute.data.color
  }
  return undefined
}

export const defaultRegressionLineLabelX = (datum: any, ctx: any, opt: any) => {
  const parentNode = opt.mark?._product?.parent

  if (parentNode?.attribute?.data?.linePoints) {
    const points = parentNode.attribute.data.linePoints
    return points[points.length - 1]?.x
  }

  return undefined
}

export const defaultRegressionLineLabelY = (datum: any, ctx: any, opt: any) => {
  const parentNode = opt.mark?._product?.parent

  if (parentNode?.attribute?.data?.linePoints) {
    const points = parentNode.attribute.data.linePoints
    return points[points.length - 1]?.y
  }

  return undefined
}
