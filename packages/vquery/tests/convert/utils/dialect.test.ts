import { PostgresDialect } from 'src/dataset/convert/postgresDialect'
import { Kysely } from 'kysely'

describe('kysely dialect coverage', () => {
  it('createIntrospector executes', async () => {
    const dialect = new PostgresDialect()
    const db = new Kysely<{ t: { id: number } }>({ dialect })
    const introspector = dialect.createIntrospector(db)
    expect(introspector).toBeDefined()
  })
  it('driver/compiler/adapter are creatable', () => {
    const dialect = new PostgresDialect()
    const driver = dialect.createDriver()
    const compiler = dialect.createQueryCompiler()
    const adapter = dialect.createAdapter()
    expect(driver).toBeDefined()
    expect(compiler).toBeDefined()
    expect(adapter).toBeDefined()
  })
})
