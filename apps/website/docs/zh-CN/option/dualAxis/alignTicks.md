# alignTicks

**Type:** `boolean | boolean[] | undefined`

:::note{title=描述}
用于定义双轴图的两根轴的刻度是否对齐, 当measures有多组时, alignTicks可以配置为数组, 每项对应一个双轴图的刻度是否对齐.:::

**示例**
{"chartType":"dualAxis","dataset":[{"date":"2019","profit":10,"sales":100},{"date":"2020","profit":30,"sales":200},{"date":"2021","profit":30,"sales":300},{"date":"2022","profit":50,"sales":500}],"alignTicks":[false,true],"dualMeasures":[{"primaryMeasures":[{"id":"profit"}],"secondaryMeasures":[{"id":"sales"}]},{"primaryMeasures":[{"id":"profit"}],"secondaryMeasures":[{"id":"sales"}]}]}


