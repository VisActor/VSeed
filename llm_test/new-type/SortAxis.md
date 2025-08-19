### SortAxis
X轴排序配置, 支持根据维度或指标排序, 以及自定义排序顺序
```typescript
export type SortAxis = {
  /**
   * @description 排序顺序, 可选值为 'asc' 或 'desc'
   * @default 'asc'
   * @enum ['asc', 'desc']
   * @example order:'asc'
   */
  order?: 'asc' | 'desc'

  /**
   * @description 排序依赖的字段, 可以是维度id或指标id
   * @default ''
   * @example 
   * - orderBy:'date'
   * - orderBy:'profit'
   */
  orderBy?: string

  /**
   * @description 自定义排序顺序, 该顺序将直接应用至类目轴
   */
  customOrder?: string[]
}
```