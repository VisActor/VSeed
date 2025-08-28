# scatter
## 描述
散点图类型定义

散点图，适用于展示数据的分布情况，通过点的位置表示数据的数值
适用场景:
- 分析数据的分布特征, 如数据的中心趋势, 分布范围, 异常值等
数据要求:
- 至少2个数值字段（度量）
- 第一个指标字段会放至X轴, 其余指标会进行合并, 映射至Y轴
- 指标名称和维度名称会合并, 作为图例项展示
默认开启的功能:
- 默认开启图例、坐标轴、数据点标记、提示信息、趋势线


## 属性

### chartType

**类型:** `"scatter"`

**描述:**
散点图

散点图，适用于展示数据的分布情况，通过点的位置表示数据的数值

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