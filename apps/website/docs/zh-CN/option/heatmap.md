# heatmap
## 描述
热力图类型定义

热力图，通过二维矩阵的颜色深浅展示数据的分布和强弱关系
适用场景:
- 大规模二维数据的密度和强度展示
- 分类与数值的关联分析
- 时间序列与类别的交叉对比
数据要求:
- 至少2个维度字段，用于确定热力图的行和列
- 至少1个数值字段（度量），用于映射颜色深浅
- 支持多个指标时，通常选择一个指标进行颜色映射
默认开启的功能:
- 默认开启图例、坐标轴、数据标签、提示信息、数值缩放


## 属性

### chartType

**类型:** `"heatmap"`

**描述:**
热力图

热力图，通过二维矩阵的颜色深浅展示数据的分布和强弱关系

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