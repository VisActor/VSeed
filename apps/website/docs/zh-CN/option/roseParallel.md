# roseParallel
## 描述
分组玫瑰图类型定义

分组玫瑰图，适用于多维度数据对比场景，通过极坐标系下的扇形弧度和半径展示数据大小
适用场景:
- 多维度数据的分布对比
- 周期性数据的强弱比较
- 分类数据的数值与占比同时展示
数据要求:
- 至少1个数值字段（度量）
- 第一个维度会放至角度轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示
- 所有指标会自动合并为一个指标
默认开启的功能:
- 默认开启图例、极坐标系、数据标签、提示信息、数值缩放


## Properties

### chartType

**Type:** `"roseParallel"`

**Description:**
分组玫瑰图

分组玫瑰图，通过极坐标系展示多维度数据对比关系

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