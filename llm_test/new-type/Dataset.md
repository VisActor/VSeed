### Dataset

符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, 一个字段对应一列, 一个记录对应一行

```typescript
export type Dataset = {
  [k: string]: unknown
}[]
```
