# columnParallel
## 描述
并列柱状图类型定义

并列柱状图，适用于多指标并行对比场景，多个柱子并列排列展示不同指标值
适用场景:
- 同一维度下多指标并行对比
- 多维度数据的横向比较
- 指标间关联性分析
数据要求:
- 至少1个指标字段（度量）
- 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
- 所有指标会自动合并为一个指标
默认开启的功能:
- 默认开启图例、坐标轴、数据标签、提示信息、指标排序


## 属性·

### chartType

**类型:** `"columnParallel"`

**描述:**
并列柱状图

并列柱状图，适用于多指标并行对比场景

---

### backgroundColor

**类型:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/properties/config/backgroundColor/backgroundColor").BackgroundColor`

**描述:**
图表的背景颜色

背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'

---

### stackCornerRadius

**类型:** `number | number[] | undefined`

**描述:**
柱状图 堆叠圆角

条形图 堆叠圆角

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