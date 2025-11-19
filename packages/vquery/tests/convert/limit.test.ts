import { convertDSLToSQL } from '@visactor/vquery'

describe('limit', () => {
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
        limit: 100,
      },
      'orders',
    )
    expect(sql).toMatchInlineSnapshot(`"select "id" from "orders" limit 100"`)
  })
})
