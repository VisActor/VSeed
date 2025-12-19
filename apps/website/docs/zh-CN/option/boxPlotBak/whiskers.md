# whiskers

**Type:** `number | number[] | undefined`

:::note{title=描述}
直方图的须长配置，支持标量值和长度为2 的数组

当值为标量的时候，使用 whiskers * IQR 来计算上界值和下界值

当值为2元数组的时候，whiskers[0] 需要在[0, 0.25)之间，表示下界值取对应的百分位数；

whiskers[1] 需要在(0.75, 1]之间，表示上界值取对应的百分位数；

:::

