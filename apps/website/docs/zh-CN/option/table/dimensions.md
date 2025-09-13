# dimensions

**Type:** `DimensionTree | undefined`

:::note{title=描述}
表格的每个维度会对应一列

:::

**示例**
[{id: "name", alias: "名称"}]




## id

**Type:** `string`

## alias

**Type:** `string | undefined`

## encoding

**Type:** `"xAxis" | "yAxis" | "angle" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=描述}
维度映射的通道

\- x: 支持将多个维度映射到x轴, 支持柱状图、折线图、面积图等

\- y: 支持将多个维度映射到y轴, 支持柱状图、折线图、面积图等

\- angle: 支持将多个维度映射到角度通道, 支持玫瑰图、雷达图等

\- color: 支持将多个维度映射到颜色通道, 支持所有图表类型

\- detail: 支持将多个维度映射到详情通道, 支持所有图表类型

\- tooltip: 支持将多个维度映射到提示通道, 支持所有图表类型

\- label: 支持将多个维度映射到标签通道, 支持所有图表类型

\- row: 支持将多个维度映射到行通道, 支持所有图表类型

\- column: 支持将多个维度映射到列通道, 支持所有图表类型

:::

## children

**Type:** `(Dimension | DimensionGroup)[] | undefined`


### id

**Type:** `string`

### alias

**Type:** `string | undefined`

### encoding

**Type:** `"xAxis" | "yAxis" | "angle" | "color" | "detail" | "tooltip" | "label" | "row" | "column" | undefined`

:::note{title=描述}
维度映射的通道

\- x: 支持将多个维度映射到x轴, 支持柱状图、折线图、面积图等

\- y: 支持将多个维度映射到y轴, 支持柱状图、折线图、面积图等

\- angle: 支持将多个维度映射到角度通道, 支持玫瑰图、雷达图等

\- color: 支持将多个维度映射到颜色通道, 支持所有图表类型

\- detail: 支持将多个维度映射到详情通道, 支持所有图表类型

\- tooltip: 支持将多个维度映射到提示通道, 支持所有图表类型

\- label: 支持将多个维度映射到标签通道, 支持所有图表类型

\- row: 支持将多个维度映射到行通道, 支持所有图表类型

\- column: 支持将多个维度映射到列通道, 支持所有图表类型

:::

