
### Measures
```typescript
export type Measures = (
  | _Schema0
  | {
      id: string;
      alias?: string;
      visible?: boolean;
      autoFormat?: boolean;
      format?: {
        type?: "number" | "percent" | "permille";
        ratio?: number;
        symbol?: string;
        thousandSeparator?: boolean;
        decimalPlaces?: number;
        round?: "round" | "floor" | "ceil";
        prefix?: string;
        suffix?: string;
      };
    }
)[];

export interface _Schema0 {
  id: string;
  alias?: string;
  visible?: boolean;
  children?: (
    | _Schema0
    | {
        id: string;
        alias?: string;
        visible?: boolean;
        autoFormat?: boolean;
        format?: {
          type?: "number" | "percent" | "permille";
          ratio?: number;
          symbol?: string;
          thousandSeparator?: boolean;
          decimalPlaces?: number;
          round?: "round" | "floor" | "ceil";
          prefix?: string;
          suffix?: string;
        };
      }
  )[];
}

```
  