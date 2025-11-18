import { QueryDSL } from 'src/types'

export const convertDSLToSQL = <T>(dsl: QueryDSL<T>, tableName: string): string => {
  console.info(dsl)
  console.info(tableName)
  return ''
}
