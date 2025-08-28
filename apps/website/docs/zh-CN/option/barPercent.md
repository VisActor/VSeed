# barPercent
## 描述
百分比条形图类型定义

百分比条形图，适用于横向展示各类别占比关系的场景，X轴以百分比形式展示数据占比
适用场景:
- 类别名称较长时的占比对比
- 多维度数据的横向构成分析
- 排名与占比同时展示的场景
数据要求:
- 至少1个维度字段和1个度量字段
- 所有类别占比之和为100%
- 支持多系列堆叠展示占比关系
默认开启的功能:
- 默认开启图例、坐标轴、百分比标签、提示信息、占比计算


## Properties

### chartType

**Type:** `"barPercent"`

**Description:**
百分比条形图

百分比条形图，以横向百分比形式展示各类别数据占比关系

---

### backgroundColor

**Type:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/properties/config/backgroundColor/backgroundColor").BackgroundColor`

**Description:**
图表的背景颜色

背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'

---

### stackCornerRadius

**Type:** `number | number[] | undefined`

**Description:**
条形图 堆叠圆角

条形图 堆叠圆角

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