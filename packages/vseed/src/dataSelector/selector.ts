import type { Datum } from 'src/types'
import type {
  DimensionSelector,
  MeasureSelector,
  PartialDatumSelector,
  Selector,
  Selectors,
  ValueSelector,
} from '../types/dataSelector'
import { omit } from 'remeda'

export const selector = (vchartDatum: Datum, selector: Selector | Selectors | undefined | null) => {
  // 无有效选择器, 则认为全部匹配成功
  if (!selector) {
    return true
  }

  const selectorMode = 'And'

  // 过滤掉 vchart 相关字段
  const vchartKeys = Object.keys(vchartDatum).filter((k) => k.toLocaleLowerCase().startsWith('__vchart'))
  const datum = omit(vchartDatum, vchartKeys) as Datum

  // 统一处理选择器为数组
  const selectors = (Array.isArray(selector) ? selector : [selector]) as Selectors

  return selectors[selectorMode === 'And' ? 'every' : 'some']((selector) => {
    // 1. 字符串或数字
    if (isValueSelector(selector)) {
      if (Object.values(datum).find((v) => v === selector)) {
        return true
      }
    }

    // 2. 指标选择器
    else if (isMeasureSelector(selector)) {
      const op = selector.operator || selector.op
      const selectorValueArr = Array.isArray(selector.value) ? selector.value : [selector.value]

      switch (op) {
        case '=':
          if (String(datum[selector.field]) === String(selectorValueArr[0])) {
            return true
          }
          break
        case '==':
          if (datum[selector.field] === selectorValueArr[0]) {
            return true
          }
          break
        case '!=':
          if (datum[selector.field] !== selectorValueArr[0]) {
            return true
          }
          break
        case '>':
          if (datum[selector.field] > selectorValueArr[0]) {
            return true
          }
          break
        case '<':
          if (datum[selector.field] < selectorValueArr[0]) {
            return true
          }
          break
        case '>=':
          if (datum[selector.field] >= selectorValueArr[0]) {
            return true
          }
          break
        case '<=':
          if (datum[selector.field] <= selectorValueArr[0]) {
            return true
          }
          break
        case 'between':
          if (
            Array.isArray(selector.value) &&
            datum[selector.field] >= selectorValueArr[0] &&
            datum[selector.field] <= selectorValueArr[1]
          ) {
            return true
          }
          break
      }
    }
    // 3. 维度选择器
    else if (isDimensionSelector(selector)) {
      const op = selector.operator || selector.op
      const selectorValueArr = Array.isArray(selector.value) ? selector.value : [selector.value]
      switch (op) {
        case 'in':
          if (selectorValueArr.includes(datum[selector.field] as string | number)) {
            return true
          }
          break
        case 'not in':
          if (!selectorValueArr.includes(datum[selector.field] as string | number)) {
            return true
          }
          break
      }
    }
    // 4. 部分数据对象选择器
    else if (isPartialDatumSelector(selector)) {
      if (Object.keys(selector).every((key) => datum[key] === selector[key])) {
        return true
      }
    }

    return false
  })
}

export const isValueSelector = (selector: Selector): selector is ValueSelector => {
  return typeof selector === 'string' || typeof selector === 'number'
}

export const isPartialDatumSelector = (selector: Selector): selector is PartialDatumSelector => {
  return typeof selector === 'object' && selector !== null
}

export const isMeasureSelector = (selector: Selector): selector is MeasureSelector => {
  return (
    typeof selector === 'object' &&
    selector !== null &&
    'field' in selector &&
    ('operator' in selector || 'op' in selector) &&
    'value' in selector &&
    (['=', '==', '!=', '>', '<', '>=', '<=', 'between'].includes(selector.operator as string) ||
      ['=', '==', '!=', '>', '<', '>=', '<=', 'between'].includes(selector.op as string))
  )
}

export const isDimensionSelector = (selector: Selector): selector is DimensionSelector => {
  return (
    typeof selector === 'object' &&
    selector !== null &&
    'field' in selector &&
    ('operator' in selector || 'op' in selector) &&
    'value' in selector &&
    (['in', 'not in'].includes(selector.operator as string) || ['in', 'not in'].includes(selector.op as string))
  )
}
