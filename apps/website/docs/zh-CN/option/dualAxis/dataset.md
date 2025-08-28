# dataset

**Type:** `Record<string | number, any>[]`

:::tip{title=描述}
数据集, 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 双轴图的数据最终会被转换为2个维度, 1或2个指标(取决于用户是否配置了指标组).:::


 

**示例:**
[{month:'1月', value:100, growth:0.2}, {month:'2月', value:150, growth:0.5}]


 

