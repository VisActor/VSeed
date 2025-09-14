# label

**Type:** `Label | undefined`

:::note{title=描述}
标签



标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.

:::


## enable

**Type:** `false | true`

:::note{title=描述}
标签功能是否开启

:::

## wrap

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否换行

:::

## showValue

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否显示指标值

多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾

:::

## showValuePercent

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否显示指标值的百分比

多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾

:::

