# pie
## 描述
饼图类型定义

饼图，适用于展示单一维度数据的占比关系，通过扇形面积大小表示各类别占比
适用场景:
- 展示分类数据的占比分布
- 强调数据的整体与部分关系
- 类别数量较少（建议不超过6个）的占比分析
数据要求:
- 至少1个数值字段（度量）
- 所有维度会与指标名称(存在多个指标时)合并成一个维度, 作为图例项展示
- 所有指标会自动合并为一个指标
默认开启的功能:
- 默认开启图例、数据标签、提示信息、占比计算


## Properties

### chartType

**Type:** `"pie"`

**Description:**
饼图

饼图，展示单一维度数据的占比关系

---

### backgroundColor

**Type:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/properties/config/backgroundColor/backgroundColor").BackgroundColor`

**Description:**
图表的背景颜色

背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'

---

### theme

**Type:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/properties/theme/theme").Theme | undefined`

**Description:**
图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置

内置light与dark两种主题, 用户可以通过Builder自定义主题

---

### locale

**Type:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/i18n/i18n").Locale | undefined`

**Description:**
语言

图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言