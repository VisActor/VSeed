# encoding

**Type:** `Pick<Encoding, "label" | "color" | "detail" | "tooltip" | "angle"> | undefined`

:::note{title=描述}
编码配置, 雷达图的视觉通道, 包括: angle通道, color通道, detail通道, label通道, tooltip通道

\- angle: 映射到角度的字段, 支持放入多个维度

\- detail: 详情映射通道, 支持放入多个维度

\- tooltip: 提示映射通道, 支持放入多个维度 和 多个指标

\- color: 颜色映射通道, 支持放入多个维度 或 1个 指标

\- label: 标签映射通道, 支持放入 多个维度 或 1个指标:::


## label

**Type:** `string[] | undefined`

:::note{title=描述}
标签映射通道, 支持放入多个维度字段 和 多个指标字段, 每多一个字段, label内就会多显示一个字段的信息:::

## color

**Type:** `string[] | undefined`

:::note{title=描述}
颜色映射通道, 支持放入多个维度字段 或 1个 指标字段

\- 多个维度: 合并所有维度为离散的图例项

\- 1个指标: 映射为连续的颜色渐变:::

## detail

**Type:** `string[] | undefined`

:::note{title=描述}
细分映射通道, 支持放入多个维度字段, 不支持放入指标字段, 在图表中显示更细粒度的数据:::

## tooltip

**Type:** `string[] | undefined`

:::note{title=描述}
提示映射通道, 支持放入多个维度字段 和 多个指标字段, 每多一个字段, tooltip内就会多显示一个字段的信息:::

## angle

**Type:** `string[] | undefined`

:::note{title=描述}
角度映射通道, 支持放入多个维度字段, 不支持放入指标字段, 在饼图中用于显示角度:::

