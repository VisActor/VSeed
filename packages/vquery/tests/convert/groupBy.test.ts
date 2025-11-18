import { convertDSLToSQL } from '@visactor/vquery'

describe('groupBy', () => {
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
        select: ['id', 'department'],
        limit: 100,
        groupBy: ['id', 'department'],
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"SELECT id, department FROM orders GROUP BY id, department LIMIT 100"`)
  })
})
