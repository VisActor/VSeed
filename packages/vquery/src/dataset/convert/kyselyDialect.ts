import { Dialect, DummyDriver, SqliteAdapter } from 'kysely'
import { SqliteQueryCompiler } from 'kysely'
import { Kysely } from 'kysely'
import type {
  DatabaseIntrospector,
  SchemaMetadata,
  TableMetadata,
  DatabaseMetadata,
  DatabaseMetadataOptions,
} from 'kysely'

export class LiteSqliteDialect implements Dialect {
  createDriver() {
    return new DummyDriver()
  }
  createQueryCompiler() {
    return new SqliteQueryCompiler()
  }
  createAdapter() {
    return new SqliteAdapter()
  }
  createIntrospector<DB = unknown>(db: Kysely<DB>): DatabaseIntrospector {
    void db
    class NullIntrospector implements DatabaseIntrospector {
      async getSchemas(): Promise<SchemaMetadata[]> {
        return []
      }
      async getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]> {
        void options?.withInternalKyselyTables
        return []
      }
      async getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata> {
        void options?.withInternalKyselyTables
        return { tables: [] }
      }
    }
    return new NullIntrospector()
  }
}
