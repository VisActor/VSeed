`Dataset` 是一个对象数组，其中每个对象代表一个数据点。

```typescript
export type Datum = Record<string | number, any>;
export type Dataset = Datum[];
```