
### ColorLegend
热力图的颜色图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.
```typescript
export interface ColorLegend {
  position?:
    | (
        | "left"
        | "leftTop"
        | "leftBottom"
        | "lt"
        | "lb"
        | "top"
        | "topLeft"
        | "topRight"
        | "tl"
        | "tr"
        | "right"
        | "rightTop"
        | "rightBottom"
        | "rt"
        | "rb"
        | "bottom"
        | "bottomLeft"
        | "bottomRight"
        | "bl"
        | "br"
      )
    | null;
  enable?: boolean | null;
}

```
  