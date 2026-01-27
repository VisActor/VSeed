export interface Page {
  /**
   * @description 分页字段, 用于指定分页的字段名, 必须是维度
   */
  field: string
  /**
   * @description 当前分页值, 用于指定当前分页的依据值
   * @example '2023-01-01'
   */
  currentValue: string
}
