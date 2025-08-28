# radar
## 描述
雷达图类型定义

雷达图，适用于多维度数据的对比分析，通过多轴坐标系展示各维度的数值分布
适用场景:
- 多维度数据的综合表现对比
- 多个对象在多个指标上的性能评估
- 分类数据的多维度特征展示
数据要求:
- 至少1个数值字段（度量）
- 第一个维度作为雷达图的各个维度轴，其他维度作为不同的系列进行对比
- 支持多个指标分别作为不同的系列展示
默认开启的功能:
- 默认开启图例、雷达坐标系、数据标签、提示信息、数值缩放


## 属性

### chartType

**类型:** `"radar"`

**描述:**
雷达图

雷达图，通过多轴坐标系展示多维度数据对比关系

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