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

    const sql = convertDSLToSQL<USER>(
      {
        select: ['id'],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"SELECT id FROM orders"`)
  })

  it('func', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
    }

    const sql = convertDSLToSQL<USER>(
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
      `"SELECT department, name, avg(age) AS "AGE" FROM orders GROUP BY department, name ORDER BY age DESC"`,
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

    const sql = convertDSLToSQL<USER>(
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
      `"SELECT department, name AS "NAME", avg(age) AS "AGE" FROM orders GROUP BY department, name ORDER BY age DESC"`,
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

    const sql = convertDSLToSQL<USER>(
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
      `"SELECT department, name AS "NAME", avg(age) AS "AGE" FROM orders GROUP BY department, name ORDER BY age DESC"`,
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

    const sql = convertDSLToSQL<USER>(
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
    expect(sql).toMatchInlineSnapshot(`"SELECT * FROM orders GROUP BY department, name ORDER BY age DESC"`)
  })
})
