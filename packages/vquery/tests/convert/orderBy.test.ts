import { convertDSLToSQL } from '@visactor/vquery'

describe('orderBy', () => {
  it('desc', () => {
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
        orderBy: [
          {
            field: 'id',
            order: 'desc',
          },
        ],
        limit: 100,
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"SELECT id FROM orders ORDER BY id DESC LIMIT 100"`)
  })

  it('asc', () => {
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
        orderBy: [
          {
            field: 'id',
            order: 'asc',
          },
        ],
        limit: 100,
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"SELECT id FROM orders ORDER BY id ASC LIMIT 100"`)
  })
})
