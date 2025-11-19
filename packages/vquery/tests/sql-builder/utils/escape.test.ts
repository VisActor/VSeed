import { convertDSLToSQL } from '@visactor/vquery'

describe('escapeValue paths', () => {
  it('boolean and object values', () => {
    interface T {
      id: number
      flag: boolean
      meta: Record<string, unknown>
    }

    const sql = convertDSLToSQL<T, 'orders'>(
      {
        select: ['id'],
        where: {
          op: 'and',
          conditions: [
            { field: 'flag', op: '=', value: true },
            { field: 'meta', op: '=', value: { a: 1 } },
          ],
        },
      },
      'orders',
    )

    expect(sql).toMatchInlineSnapshot(
      `"select "id" from "orders" where ("flag" = TRUE and "meta" = '[object Object]')"`,
    )
  })
})
