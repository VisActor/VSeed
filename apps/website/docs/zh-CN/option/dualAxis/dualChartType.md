# dualChartType

**Type:** `{ primary: "area" | "line" | "column" | "columnParallel" | "scatter"; secondary: "area" | "line" | "column" | "columnParallel" | "scatter"; } | { primary: "area" | "line" | "column" | "columnParallel" | "scatter"; secondary: "area" | "line" | "column" | "columnParallel" | "scatter"; }[] | undefined`

**描述:**
双轴图的主次轴的图表类型, 用于定义双轴图的类型, 包括折线图, 柱状图, 面积图等, 当measures有多组时, dualChartType可以配置为数组, 每项对应一个双轴图的子图表类型.

**示例:**
{primary: 'line', secondary: 'bar'}
  [{primary: 'line', secondary: 'bar'}, {primary: 'column', secondary: 'area'}]

