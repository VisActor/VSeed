export interface Page {
  /**
   * @description 分页字段, 用于指定分页的字段名, 必须是维度
   */
  field: string
  /**
   * @description 当前分页值, 用于指定当前分页的页码或页码范围
   * @example 1
   * @example '2023-01-01'
   */
  currentValue: string | number
}
