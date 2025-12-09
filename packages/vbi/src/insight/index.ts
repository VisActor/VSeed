import { InsightType, TidyData, VInsightDSL, VInsightResult, InsightInfoItem } from './types'
import { median, medianAbsoluteDeviation, mean, standardDeviation } from 'simple-statistics'

const zScoreMad = (dataset: TidyData, insightDSL: VInsightDSL): VInsightResult => {
  if (insightDSL.insightType !== 'zScoreMad') return { dataset, insightInfo: [] }
  const { measures, threshold = 2.5 } = insightDSL
  const stats: Record<string, { median: number; mad: number }> = {}
  for (const field of measures) {
    const values = dataset.map((d) => d[field]).filter((v): v is number => typeof v === 'number' && Number.isFinite(v))
    const m = values.length ? median(values) : 0
    const mad = values.length ? medianAbsoluteDeviation(values) : 0
    stats[field] = { median: m, mad }
  }
  const out = dataset.map((d) => {
    const nd: Record<string, unknown> = { ...d }
    for (const field of measures) {
      const v = d[field]
      const sKey = `${field}_score`
      const aKey = `${field}_isAnomaly`
      let z = 0
      if (typeof v === 'number' && Number.isFinite(v)) {
        const m = stats[field].median
        const mad = stats[field].mad
        z = mad === 0 ? 0 : (0.6745 * (v - m)) / mad
      }
      nd[sKey] = z
      nd[aKey] = Math.abs(z) >= threshold
    }
    return nd
  }) as TidyData
  const insightInfo: InsightInfoItem[] = measures.map((field) => ({
    field,
    scoreField: `${field}_score`,
    isAnomalyField: `${field}_isAnomaly`,
    algorithm: 'zScoreMad',
    params: {
      threshold,
      median: stats[field]?.median ?? 0,
      mad: stats[field]?.mad ?? 0,
    },
  }))
  return { dataset: out, insightInfo }
}

const zScoreRolling = (dataset: TidyData, insightDSL: VInsightDSL): VInsightResult => {
  if (insightDSL.insightType !== 'zScoreRolling') return { dataset, insightInfo: [] }
  const { valueField, window, outputField, timeField, threshold } = insightDSL.schema
  const base = outputField ?? valueField
  const out = dataset.map((d, i) => {
    const nd: Record<string, unknown> = { ...d }
    const prev: number[] = []
    const start = Math.max(0, i - window)
    for (let k = start; k < i; k++) {
      const vv = dataset[k][valueField]
      if (typeof vv === 'number' && Number.isFinite(vv)) prev.push(vv)
    }
    const v = d[valueField]
    let z = 0
    if (typeof v === 'number' && Number.isFinite(v) && prev.length >= 2) {
      const m = mean(prev)
      const sd = standardDeviation(prev)
      z = sd === 0 ? 0 : (v - m) / sd
    }
    nd[`${base}_score`] = z
    nd[`${base}_isAnomaly`] = Math.abs(z) >= threshold
    return nd
  }) as TidyData
  const insightInfo: InsightInfoItem[] = [
    {
      field: base,
      scoreField: `${base}_score`,
      isAnomalyField: `${base}_isAnomaly`,
      algorithm: 'zScoreRolling',
      params: { window, threshold, valueField, outputField: base, timeField: timeField ?? null },
    },
  ]
  return { dataset: out, insightInfo }
}

const insightMap: Record<InsightType, (dataset: TidyData, insightDSL: VInsightDSL) => VInsightResult> = {
  zScoreMad: zScoreMad,
  zScoreRolling: zScoreRolling,
}

export function quickInsight(dataset: TidyData, insightDSL: VInsightDSL): VInsightResult {
  const insightFn = insightMap[insightDSL.insightType]
  if (insightFn) {
    return insightFn(dataset, insightDSL)
  }
  return { dataset, insightInfo: [] }
}
