import { escapeValue } from '../utils'

export const inlineParameters = (sql: string, params: readonly unknown[]): string => {
  if (params.length === 0) return sql
  if (sql.includes('?')) {
    let out = sql
    for (const p of params) {
      out = out.replace(/\?/, escapeValue(p))
    }
    return out
  }
  if (/\$\d+/.test(sql)) {
    return sql.replace(/\$(\d+)/g, (_, idx) => {
      const i = Number(idx) - 1
      const v = params[i]
      return escapeValue(v)
    })
  }
  return sql
}
