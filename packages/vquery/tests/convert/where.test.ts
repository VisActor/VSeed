import { convertDSLToSQL } from '@visactor/vquery'

describe('where', () => {
  it('simple', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
      gender: 'male' | 'female'
    }

    const sql = convertDSLToSQL<USER>(
      {
        select: ['id'],
        where: {
          op: 'or',
          conditions: [
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '>=',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: '=',
                  value: 'male',
                },
              ],
            },
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '<',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: '=',
                  value: 'female',
                },
              ],
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"SELECT id FROM orders WHERE ((age >= 18 AND gender = 'male') OR (age < 18 AND gender = 'female'))"`,
    )
  })

  it('empty', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
      gender: 'male' | 'female'
    }

    const sql = convertDSLToSQL<USER>(
      {
        select: ['id'],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"SELECT id FROM orders"`)
  })

  it('is null & is not null', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
      gender: 'male' | 'female'
    }

    const sql = convertDSLToSQL<USER>(
      {
        select: ['id'],
        where: {
          op: 'or',
          conditions: [
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '>=',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: 'is null',
                },
              ],
            },
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '<',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: 'is not null',
                },
              ],
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"SELECT id FROM orders WHERE ((age >= 18 AND gender is null) OR (age < 18 AND gender is not null))"`,
    )
  })

  it('in & not in', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
      gender: 'male' | 'female'
    }

    const sql = convertDSLToSQL<USER>(
      {
        select: ['id'],
        where: {
          op: 'or',
          conditions: [
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '>=',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: 'in',
                  value: ['male', 'female'],
                },
              ],
            },
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: '<',
                  value: 18,
                },
                {
                  field: 'gender',
                  op: 'not in',
                  value: ['male', 'female'],
                },
              ],
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"SELECT id FROM orders WHERE ((age >= 18 AND gender in ('male', 'female')) OR (age < 18 AND gender not in ('male', 'female')))"`,
    )
  })

  it('between & not between', () => {
    interface USER {
      id: number
      name: string
      age: number
      department: string
      active: number
      gender: 'male' | 'female'
    }

    const sql = convertDSLToSQL<USER>(
      {
        select: ['id'],
        where: {
          op: 'or',
          conditions: [
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: 'between',
                  value: [18, 30],
                },
                {
                  field: 'gender',
                  op: 'in',
                  value: ['male', 'female'],
                },
              ],
            },
            {
              op: 'and',
              conditions: [
                {
                  field: 'age',
                  op: 'not between',
                  value: [18, 30],
                },
                {
                  field: 'gender',
                  op: 'not in',
                  value: ['male', 'female'],
                },
              ],
            },
          ],
        },
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(
      `"SELECT id FROM orders WHERE ((age between 18 and 30 AND gender in ('male', 'female')) OR (age not between 18 and 30 AND gender not in ('male', 'female')))"`,
    )
  })
})
