
### Dimensions
表格的每个维度会对应一列
```typescript
export type Dimensions = {
  id: string;
  alias?: string;
  visible?: boolean;
  location: "dimension" | "rowDimension" | "columnDimension";
}[];

```
  