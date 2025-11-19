import { PostgresDialect } from 'src/sql-builder/postgresDialect'
import { Kysely } from 'kysely'

describe('postgres dialect introspector', () => {
  it('introspector methods return empty', async () => {
    const dialect = new PostgresDialect()
    const db = new Kysely<{ t: { id: number } }>({ dialect })
    const introspector = dialect.createIntrospector(db)
    const schemas = await introspector.getSchemas()
    const tables = await introspector.getTables()
    const meta = await introspector.getMetadata()
    expect(Array.isArray(schemas)).toBe(true)
    expect(schemas.length).toBe(0)
    expect(Array.isArray(tables)).toBe(true)
    expect(tables.length).toBe(0)
    expect(Array.isArray(meta.tables)).toBe(true)
    expect(meta.tables.length).toBe(0)
  })
})
