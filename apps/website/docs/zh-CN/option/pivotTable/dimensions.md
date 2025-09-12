# dimensions

**Type:** `Dimensions | undefined`

:::note{title=描述}
透视表的行维度和列维度，会自动对数据进行处理为树形结构, 并映射到行和列轴,

:::

**示例**
[{id: 'region', alias: '地区', isRow: true}, {id: 'product', alias: '产品', isColumn: true}]




## id

**Type:** `string`

## alias

**Type:** `string | undefined`

## encoding

**Type:** `"color" | "detail" | "label" | "tooltip" | "xAxis" | "yAxis" | "angle" | "row" | "column" | undefined`

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

