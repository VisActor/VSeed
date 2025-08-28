# area
## 描述
面积图类型定义

面积图, 适用于展示数据随时间变化的趋势及累积关系, 通过填充区域增强数据对比. X轴为类目轴(分类数据), Y轴为数值轴(连续数据).
适用场景:
- 展示单一数据系列的趋势变化
- 强调总量随时间的累积效果
- 对比多个数据系列的总量差异
数据要求:
- 至少1个指标字段（度量）
- 第一个维度字段映射到X轴，其余维度字段会与指标名称(存在多个指标时)合并, 作为图例项展示.
- 所有指标会自动合并为一个指标
默认开启的功能:
- 模块开启堆叠
- 默认开启图例、坐标轴、区域填充、数据标签、提示信息


## 属性·

### chartType

**类型:** `"area"`

**描述:**
面积图

面积图，展示数据趋势及累积关系的图表类型

---

### backgroundColor

**类型:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/properties/config/backgroundColor/backgroundColor").BackgroundColor`

**描述:**
图表的背景颜色

背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'

---

### theme

**类型:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/properties/theme/theme").Theme | undefined`

**描述:**
图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置

内置light与dark两种主题, 用户可以通过Builder自定义主题

---

### locale

**类型:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/i18n/i18n").Locale | undefined`

**描述:**
语言

图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言