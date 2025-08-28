# dualAxis
## 描述
双轴图类型定义

双轴图，适用于展示两个不同量级或不同单位指标的对比关系，包含主坐标轴和次坐标轴
适用场景:
- 不同量级指标的对比分析
- 相关性指标的趋势比较
- 需要同时展示数值和增长率等复合指标
- 支持不同类型图表组合（如折线图+柱状图/ 折线图+面积图/ 面积图+柱状图）
数据要求:
- 至少1个指标字段（度量）
- 支持指标组, 第一组指标会放置(主轴)左轴, 第二组指标会放置(次轴)右轴
- 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
- 两组指标字段可分别映射到左右两个Y轴, 一个指标组内的所有会自动合并为一个指标
默认开启的功能:
- 默认开启坐标轴、图例、数据标签、提示信息


## 属性

### chartType

**类型:** `"dualAxis"`

**描述:**
双轴图，展示两个不同量级指标对比关系的复合图表

---

### backgroundColor

**类型:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/properties/config/backgroundColor/backgroundColor").BackgroundColor`

**描述:**
图表的背景颜色, 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'

---

### theme

**类型:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/properties/theme/theme").Theme | undefined`

**描述:**
图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置, 内置light与dark两种主题, 用户可以通过Builder自定义主题

---

### locale

**类型:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/i18n/i18n").Locale | undefined`

**描述:**
国际化配置, 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言