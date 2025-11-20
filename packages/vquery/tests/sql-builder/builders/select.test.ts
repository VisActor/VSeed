import { convertDSLToSQL } from '@visactor/vquery'

describe('select', () => {
  it('simple', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToSQL<USER, 'orders'>(
      {
        select: ['id'],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders""`)
  })

  it('func', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToSQL<USER, 'orders'>(
      {
        select: [
          'department',
          'name',
          {
            field: 'age',
            alias: 'AGE',
            func: 'avg',
          },
        ],
        groupBy: ['department', 'name'],
        orderBy: [
          {
            field: 'age',
            order: 'desc',
          },
        ],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "department", "name", avg("age") as "AGE" from "orders" group by "department", "name" order by "age" desc"`,
    )
  })

  it('only alias', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToSQL<USER, 'orders'>(
      {
        select: [
          'department',
          {
            field: 'name',
            alias: 'NAME',
          },
          {
            field: 'age',
            alias: 'AGE',
            func: 'avg',
          },
        ],
        groupBy: ['department', 'name'],
        orderBy: [
          {
            field: 'age',
            order: 'desc',
          },
        ],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "department", "name" as "NAME", avg("age") as "AGE" from "orders" group by "department", "name" order by "age" desc"`,
    )
  })

  it('only field', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToSQL<USER, 'orders'>(
      {
        select: [
          {
            field: 'department',
          },
          {
            field: 'name',
            alias: 'NAME',
          },
          {
            field: 'age',
            alias: 'AGE',
            func: 'avg',
          },
        ],
        groupBy: ['department', 'name'],
        orderBy: [
          {
            field: 'age',
            order: 'desc',
          },
        ],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select "department", "name" as "NAME", avg("age") as "AGE" from "orders" group by "department", "name" order by "age" desc"`,
    )
  })

  it('aggregates without alias', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToSQL<USER, 'orders'>(
      {
        select: [
          { field: 'age', func: 'sum', alias: 'SUM' },
          { field: 'age', func: 'min', alias: 'MIN' },
          { field: 'age', func: 'max', alias: 'MAX' },
          { field: 'id', func: 'count', alias: 'CNT' },
        ],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"select sum("age") as "SUM", min("age") as "MIN", max("age") as "MAX", count("id") as "CNT" from "orders""`,
    )
  })

  it('select all', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToSQL<USER, 'orders'>(
      {
        select: [],
        groupBy: ['department', 'name'],
        orderBy: [
          {
            field: 'age',
            order: 'desc',
          },
        ],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"select * from "orders" group by "department", "name" order by "age" desc"`)
  })

  it('aggregate without alias falls back to field name', () => {
    interface USER {
      id: number
      age: number
    }
    const sql = convertDSLToSQL<USER, 'orders'>({ select: [{ field: 'age', func: 'avg' }] }, 'orders')
    expect(sql).toMatchInlineSnapshot(`"select avg("age") as "age" from "orders""`)
  })
})
