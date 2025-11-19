import { LiteSqliteDialect } from 'src/dataset/convert/kyselyDialect'
import { Kysely } from 'kysely'

describe('kysely dialect coverage', () => {
  it('createIntrospector executes', async () => {
    const dialect = new LiteSqliteDialect()
    const db = new Kysely<{ t: { id: number } }>({ dialect })
    const introspector = dialect.createIntrospector(db)
    expect(introspector).toBeDefined()
  })
})
