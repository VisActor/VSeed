import { Dialect, DummyDriver } from 'kysely'
import { PostgresQueryCompiler } from 'kysely'
import { PostgresAdapter } from 'kysely'
import { Kysely } from 'kysely'
import type {
  DatabaseIntrospector,
  SchemaMetadata,
  TableMetadata,
  DatabaseMetadata,
  DatabaseMetadataOptions,
} from 'kysely'

export class PostgresDialect implements Dialect {
  createDriver() {
    return new DummyDriver()
  }
  createQueryCompiler() {
    return new PostgresQueryCompiler()
  }
  createAdapter() {
    return new PostgresAdapter()
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
