
### DimensionTree
```typescript
export type DimensionTree = (
  | _Schema0
  | {
      id: string;
      alias?: string;
      encoding?: "xAxis" | "yAxis" | "angle" | "color" | "detail" | "tooltip" | "label" | "row" | "column";
    }
)[];

export interface _Schema0 {
  id: string;
  alias?: string;
  children?: (
    | _Schema0
    | {
        id: string;
        alias?: string;
        encoding?: "xAxis" | "yAxis" | "angle" | "color" | "detail" | "tooltip" | "label" | "row" | "column";
      }
  )[];
}

```
  