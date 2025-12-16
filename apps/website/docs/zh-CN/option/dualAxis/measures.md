# measures

**Type:** `DualAxisMeasure[] | undefined`

:::note{title=描述}
双轴图指标

对于encoding中映射到primaryYAxis和secondaryYAxis的指标,

可以通过设置`parentId`属性, 将指标进行分组，不同分组的指标会显示到不同子图中，

也可以设置`chartType`属性，来指定不同指标组的图表类型。

:::

**示例**
[{ id: 'value', encoding: 'primaryYAxis' }, { id: 'growth', encoding: 'secondaryYAxis' }]



