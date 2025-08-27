
### DualMeasures
双轴图指标, 是measures的简化形式
组合的双轴图指标配置, 每个对象都代表一个双轴图, 双轴图之间纵向排列, 必须是数组.
每个配置对象内, primaryMeasures代表所有的主轴指标, secondaryMeasures代表所有的次轴指标, primaryMeasures和secondaryMeasures可配置为数组或一个对象
primaryMeasures 如果是多个指标, 则会自动合并
secondaryMeasures 如果是多个指标, 则会自动合并
```typescript
export type DualMeasures = {
  id: string;
  primaryMeasures?:
    | {
        id: string;
        alias?: string;
        autoFormat: boolean;
        format: {
          type?: "number" | "percent" | "permille" | "scientific";
          ratio?: number;
          symbol?: string;
          thousandSeparator?: boolean;
          prefix?: string;
          suffix?: string;
          fractionDigits?: number;
          significantDigits?: number;
          roundingPriority?: "morePrecision" | "lessPrecision";
          roundingMode?:
            | "floor"
            | "ceil"
            | "halfEven"
            | "expand"
            | "trunc"
            | "halfFloor"
            | "halfCeil"
            | "halfExpand"
            | "halfTrunc";
        };
      }[]
    | {
        id: string;
        alias?: string;
        autoFormat: boolean;
        format: {
          type?: "number" | "percent" | "permille" | "scientific";
          ratio?: number;
          symbol?: string;
          thousandSeparator?: boolean;
          prefix?: string;
          suffix?: string;
          fractionDigits?: number;
          significantDigits?: number;
          roundingPriority?: "morePrecision" | "lessPrecision";
          roundingMode?:
            | "floor"
            | "ceil"
            | "halfEven"
            | "expand"
            | "trunc"
            | "halfFloor"
            | "halfCeil"
            | "halfExpand"
            | "halfTrunc";
        };
      };
  secondaryMeasures?:
    | {
        id: string;
        alias?: string;
        autoFormat: boolean;
        format: {
          type?: "number" | "percent" | "permille" | "scientific";
          ratio?: number;
          symbol?: string;
          thousandSeparator?: boolean;
          prefix?: string;
          suffix?: string;
          fractionDigits?: number;
          significantDigits?: number;
          roundingPriority?: "morePrecision" | "lessPrecision";
          roundingMode?:
            | "floor"
            | "ceil"
            | "halfEven"
            | "expand"
            | "trunc"
            | "halfFloor"
            | "halfCeil"
            | "halfExpand"
            | "halfTrunc";
        };
      }[]
    | {
        id: string;
        alias?: string;
        autoFormat: boolean;
        format: {
          type?: "number" | "percent" | "permille" | "scientific";
          ratio?: number;
          symbol?: string;
          thousandSeparator?: boolean;
          prefix?: string;
          suffix?: string;
          fractionDigits?: number;
          significantDigits?: number;
          roundingPriority?: "morePrecision" | "lessPrecision";
          roundingMode?:
            | "floor"
            | "ceil"
            | "halfEven"
            | "expand"
            | "trunc"
            | "halfFloor"
            | "halfCeil"
            | "halfExpand"
            | "halfTrunc";
        };
      };
}[];

```
  