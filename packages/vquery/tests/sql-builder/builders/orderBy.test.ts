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

    const sql = convertDSLToSQL<USER, 'orders'>(
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
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders" order by "id" desc limit 100"`)
  })

  it('asc', () => {
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
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders" order by "id" asc limit 100"`)
  })

  it('order defaults to asc when omitted', () => {
    interface USER {
      id: number
    }
    const sql = convertDSLToSQL<USER, 'orders'>({ select: ['id'], orderBy: [{ field: 'id' }] }, 'orders')
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders" order by "id" asc"`)
  })
})
