# label

**Type:** `Label | undefined`

:::note{title=描述}
热力图标签配置, 用于定义图表的数据标签, 自动开启标签反色, 确保标签可读性.

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

## labelFontSize

**Type:** `number | undefined`

:::note{title=描述}
标签字体大小

:::

## labelColor

**Type:** `string | undefined`

:::note{title=描述}
标签字体颜色

:::

## labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否自动根据图元颜色进行字体颜色的反转

:::

## labelFontWeight

**Type:** `string | number | undefined`

:::note{title=描述}
标签字体粗细

:::

## labelBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
标签背景色

:::

## labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=描述}
标签位置

:::

