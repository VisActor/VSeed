
### DimensionTree
```typescript
export type DimensionTree = (
  | _Schema0
  | {
      id: string;
      alias?: string;
      location: "dimension" | "rowDimension" | "columnDimension";
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
        location: "dimension" | "rowDimension" | "columnDimension";
      }
  )[];
}

```
  