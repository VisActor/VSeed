import { isRadar } from 'src/pipeline/utils'
import type { VSeed } from 'src/types'

export const getCurveType = (vseed: VSeed, lineSmooth: boolean = false): string => {
  if (!lineSmooth) {
    return 'linear'
  }

  /**
   * Tip: 长期来看, 由VChart封装好雷达图与面积图的曲线类型差异, 是一个更好的选择.
   */
  return isRadar(vseed) ? 'catmullRomClosed' : 'monotone'
}

export const getCurveTension = (vseed: VSeed, lineSmooth: boolean = false): number => {
  if (!lineSmooth) {
    return 0
  }

  /**
   * Tip: 长期来看, 由VChart封装好雷达图与面积图的曲线类型差异, 是一个更好的选择.
   */
  return isRadar(vseed) ? 0.4 : 0
}
