# dataset

**Type:** `Record<string | number, any>[]`

**描述:**
符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 透视表的数据最终会被转换对应的树形结构, 用户无需手动进行数据处理.

**示例:**
[{region:'华东', product:'A', sales:1000}, {region:'华东', product:'B', sales:1500}]

