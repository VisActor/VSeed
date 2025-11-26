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

/**
 * 判断两个数字是否“近似相等”
 */
function nearlyEqual(a: number, b: number, epsilon = 1e-8) {
  // NaN 直接不相等
  if (Number.isNaN(a) || Number.isNaN(b)) return false
  // 引用同一个数 或 完全相等
  if (a === b) return true
  const diff = Math.abs(a - b)
  return diff <= epsilon
}

export const selector = (
  vchartDatum: Datum,
  selector: Selector | Selectors | undefined | null,
  selectorMode: 'And' | 'Or' = 'And',
) => {
  // 无有效选择器, 则认为全部匹配成功
  if (!selector) {
    return true
  }

  // 过滤掉 vchart 相关字段
  const vchartKeys = Object.keys(vchartDatum).filter((k) => k.toLocaleLowerCase().startsWith('__vchart'))
  const datum = omit(vchartDatum, vchartKeys) as Datum

  // 统一处理选择器为数组
  const selectors = (Array.isArray(selector) ? selector : [selector]) as Selectors

  return selectors[selectorMode === 'And' ? 'every' : 'some']((selector) => {
    // 1. 字符串或数字
    if (isValueSelector(selector)) {
      return selectByValue(selector, datum)
    }

    // 2. 指标选择器
    else if (isMeasureSelector(selector)) {
      return selectByMeasure(selector, datum)
    }
    // 3. 维度选择器
    else if (isDimensionSelector(selector)) {
      return selectByDmension(selector, datum)
    }
    // 4. 部分数据对象选择器
    else if (isPartialDatumSelector(selector)) {
      return selectByPartial(selector, datum)
    }

    return false
  })
}

export const selectorDatum = (datum: Datum, selector: Selector | Selectors | undefined | null): Datum[] => {
  // 无有效选择器, 则认为全部匹配成功
  if (!selector) {
    return []
  }

  // 统一处理选择器为数组
  const selectors = (Array.isArray(selector) ? selector : [selector]) as Selectors
  let finalResult: Datum[] = []

  for (const selector of selectors) {
    const results: Datum[] = []
    // 1. 字符串或数字
    if (isValueSelector(selector)) {
      Object.entries(datum).forEach(([key, value]) => {
        if (value === selector) {
          results.push({ [key]: value } as Datum)
        }
      })
    } else if (isMeasureSelector(selector) && selectByMeasure(selector, datum)) {
      results.push({ [selector.field]: datum[selector.field] } as Datum)
    } else if (isDimensionSelector(selector) && selectByDmension(selector, datum)) {
      results.push({ [selector.field]: datum[selector.field] } as Datum)
    } else if (isPartialDatumSelector(selector) && selectByPartial(selector, datum)) {
      results.push(selector)
    }

    if (results.length) {
      if (finalResult.length) {
        finalResult = finalResult.flatMap((prev) => {
          return results.map((r) => {
            return {
              ...prev,
              ...r,
            }
          })
        })
      } else {
        finalResult = results
      }
    } else {
      finalResult = []
      break
    }
  }

  return finalResult
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

export const selectByMeasure = (selector: MeasureSelector, datum: Datum) => {
  const op = selector.operator || selector.op
  const selectorValueArr = Array.isArray(selector.value) ? selector.value : [selector.value]

  switch (op) {
    case '=':
      if (
        String(datum[selector.field]) === String(selectorValueArr[0]) ||
        nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))
      ) {
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
      if (
        datum[selector.field] > selectorValueArr[0] &&
        !nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))
      ) {
        return true
      }
      break
    case '<':
      if (
        datum[selector.field] < selectorValueArr[0] &&
        !nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))
      ) {
        return true
      }
      break
    case '>=':
      if (
        datum[selector.field] >= selectorValueArr[0] ||
        nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))
      ) {
        return true
      }
      break
    case '<=':
      if (
        datum[selector.field] <= selectorValueArr[0] ||
        nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))
      ) {
        return true
      }
      break
    case 'between':
      if (
        Array.isArray(selector.value) &&
        (datum[selector.field] >= selectorValueArr[0] ||
          nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[0]))) &&
        (datum[selector.field] <= selectorValueArr[1] ||
          nearlyEqual(Number(datum[selector.field]), Number(selectorValueArr[1])))
      ) {
        return true
      }
      break
  }
  return false
}

export const selectByDmension = (selector: DimensionSelector, datum: Datum) => {
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

  return false
}

export const selectByPartial = (selector: PartialDatumSelector, datum: Datum) => {
  return Object.keys(selector).every((key) => datum[key] === selector[key])
}

export const selectByValue = (selector: ValueSelector, datum: Datum) => {
  return Object.values(datum).some((v) => v === selector)
}
