# funnel
## 描述
漏斗图

漏斗图，用于展示单一维度数据的占比关系
适用场景:
漏斗图适用场景:
- 适合用来分析具有多个连续、规范化步骤的流程，并清晰地展示在每个环节的数据流失或转化情况
数据要求:
- 至少1个数值字段（指标）
- 所有维度会与指标名称(存在多个指标时)合并成一个维度, 作为图例项展示
- 所有指标会自动合并为一个指标
默认开启的功能:
- 默认开启图例、数据标签、提示信息、占比计算


## 属性

### chartType

**类型:** `"funnel"`

**描述:**
漏斗图

漏斗图，展示单一维度数据的占比关系

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