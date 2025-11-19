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
      `"select "id" from "orders" where (("age" >= 18 and "gender" = 'male') or ("age" < 18 and "gender" = 'female'))"`,
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
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders""`)
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
      `"select "id" from "orders" where (("age" >= 18 and "gender" is null) or ("age" < 18 and "gender" is not null))"`,
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
      `"select "id" from "orders" where (("age" >= 18 and "gender" in ('male', 'female')) or ("age" < 18 and not "gender" in ('male', 'female')))"`,
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
      `"select "id" from "orders" where (("age" between (18, 30) and "gender" in ('male', 'female')) or (not "age" between (18, 30) and not "gender" in ('male', 'female')))"`,
    )
  })
})
