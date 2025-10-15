import type { Dimension, Measure, Query } from 'src/types/VQuery'

// const query: VQuery = {
//   measures: [
//     { field: '销售额', aggregation: 'sum' },
//     { field: '利润', aggregation: 'sum' },
//   ],
//   dimensions: [{ field: '发货日期', granularity: 'year' }],
//   filters: [{ field: '地区', operator: '=', value: '北京' }],
//   periodCompare: [{ type: 'year_over_year', field: '发货日期' }],
//   order: [{ field: '销售额', direction: 'desc' }],
// }

export const generateSql = (query: Query, tableName: string): string => {
  const { measures, dimensions, filters, periodCompare, order } = query

  const quote = (name: string) => `"${name}"`

  const getDimensionExpression = (d: Dimension, withAlias: boolean = true): string => {
    const field = quote(d.field)
    let expr = ''
    let alias = ''
    switch (d.granularity) {
      case 'year':
        expr = `YEAR(${field})`
        alias = quote(`year_${d.field}`)
        break
      case 'month':
        expr = `MONTH(${field})`
        alias = quote(`month_${d.field}`)
        break
      case 'day':
        expr = `DAY(${field})`
        alias = quote(`day_${d.field}`)
        break
      default:
        expr = field
        alias = field
        break
    }
    return withAlias ? `${expr} AS ${alias}` : expr
  }

  const getDimensionAlias = (d: Dimension): string => {
    switch (d.granularity) {
      case 'year':
        return quote(`year_${d.field}`)
      case 'month':
        return quote(`month_${d.field}`)
      case 'day':
        return quote(`day_${d.field}`)
      default:
        return quote(d.field)
    }
  }

  const getMeasureExpression = (m: Measure, withAlias: boolean = true): string => {
    const expr = `${m.aggregation.toUpperCase()}(${quote(m.field)})`
    const alias = quote(`${m.aggregation}_${m.field}`)
    return withAlias ? `${expr} AS ${alias}` : expr
  }

  const getMeasureAlias = (m: Measure): string => {
    return quote(`${m.aggregation}_${m.field}`)
  }

  const whereClause =
    filters.length > 0
      ? `WHERE ${filters
          .map((f) => `${quote(f.field)} ${f.operator} ${typeof f.value === 'string' ? `'${f.value}'` : f.value}`)
          .join(' AND ')}`
      : ''

  const orderByClause =
    order.length > 0
      ? `ORDER BY ${order
          .map((o) => {
            const measure = measures.find((m) => m.field === o.field)
            if (measure) {
              return `${getMeasureAlias(measure)} ${o.direction.toUpperCase()}`
            }
            const dimension = dimensions.find((d) => d.field === o.field)
            if (dimension) {
              return `${getDimensionAlias(dimension)} ${o.direction.toUpperCase()}`
            }
            return `${quote(o.field)} ${o.direction.toUpperCase()}`
          })
          .join(', ')}`
      : ''

  if (!periodCompare || periodCompare.length === 0) {
    const selectMeasures = measures.map((m) => getMeasureExpression(m))
    const selectDimensions = dimensions.map((d) => getDimensionExpression(d))
    const selectClause = `SELECT ${[...selectDimensions, ...selectMeasures].join(', ')}`
    const fromClause = `FROM ${quote(tableName)}`
    const groupByClause =
      dimensions.length > 0 ? `GROUP BY ${dimensions.map((d) => getDimensionExpression(d, false)).join(', ')}` : ''

    return [selectClause, fromClause, whereClause, groupByClause, orderByClause].filter(Boolean).join('\n')
  }

  const pc = periodCompare[0]
  const timeDimension = dimensions.find((d) => d.field === pc.field)
  if (!timeDimension) {
    throw new Error('periodCompare.field must correspond to a dimension field.')
  }

  let lagOffset = 1
  if (pc.type === 'year_over_year') {
    switch (timeDimension.granularity) {
      case 'year':
        lagOffset = 1
        break
      case 'month':
        lagOffset = 12
        break
      case 'day':
        lagOffset = 365
        break
    }
  } else if (pc.type === 'month_over_month') {
    if (timeDimension.granularity === 'year') {
      throw new Error('Cannot do month_over_month with year granularity')
    }
    switch (timeDimension.granularity) {
      case 'month':
        lagOffset = 1
        break
      case 'day':
        lagOffset = 30
        break
    }
  }

  const cteSelectDimensions = dimensions.map((d) => getDimensionExpression(d))
  const cteSelectMeasures = measures.map((m) => getMeasureExpression(m))
  const cteGroupBy = dimensions.map((d) => getDimensionExpression(d, false)).join(', ')

  const cte = `
WITH aggregated_data AS (
  SELECT
    ${[...cteSelectDimensions, ...cteSelectMeasures].join(',\n    ')}
  FROM ${quote(tableName)}
  ${whereClause}
  GROUP BY ${cteGroupBy}
)
`

  const mainSelectDimensions = dimensions.map((d) => getDimensionAlias(d))
  const timeDimAlias = getDimensionAlias(timeDimension)
  const otherDims = dimensions.filter((d) => d.field !== pc.field).map((d) => getDimensionAlias(d))
  const partitionClause = otherDims.length > 0 ? `PARTITION BY ${otherDims.join(', ')}` : ''

  const mainSelectMeasuresWithCompare = measures.flatMap((m) => {
    const measureAlias = getMeasureAlias(m)
    const prevMeasureAlias = quote(`prev_${pc.type}_${m.aggregation}_${m.field}`)
    const changeMeasureAlias = quote(`${pc.type}_change_${m.aggregation}_${m.field}`)
    const lagExpr = `LAG(${measureAlias}, ${lagOffset}) OVER (${partitionClause} ORDER BY ${timeDimAlias})`

    return [
      measureAlias,
      `${lagExpr} AS ${prevMeasureAlias}`,
      `(${measureAlias} - ${lagExpr}) / NULLIF(${lagExpr}, 0) AS ${changeMeasureAlias}`,
    ]
  })

  const mainSelect = `
SELECT
  ${[...mainSelectDimensions, ...mainSelectMeasuresWithCompare].join(',\n  ')}
FROM aggregated_data
`

  const mainOrderBy = orderByClause || `ORDER BY ${timeDimAlias}`

  return cte + mainSelect + mainOrderBy
}
