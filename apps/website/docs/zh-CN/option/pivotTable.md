# pivotTable
## 描述
透视表类型定义

透视表，适用于多维度数据交叉分析场景，可灵活配置行、列维度和指标计算方式
适用场景:
- 复杂多维数据统计分析
- 数据钻取与聚合展示
- 业务报表生成与数据探索
数据要求:
- 至少1个行维度 或 1个列维度 或 1个指标
- 数据必须已聚合
- 数据可被分组
默认开启的功能:
- 默认开启行列排序、数据筛选、聚合计算、小计/总计


## 属性·

### chartType

**类型:** `"pivotTable"`

**描述:**
透视表，适用于多维度数据交叉分析场景

---

### backgroundColor

**类型:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/types/properties/config/backgroundColor/backgroundColor").BackgroundColor`

**描述:**
背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'

---

### borderColor

**类型:** `string | undefined`

**描述:**
表格的边框颜色

---

### bodyFontSize

**类型:** `number | undefined`

**描述:**
表格体的字体大小

---

### bodyFontColor

**类型:** `string | undefined`

**描述:**
表格体的字体颜色

---

### bodyBackgroundColor

**类型:** `string | undefined`

**描述:**
表格体的背景颜色

---

### headerFontSize

**类型:** `number | undefined`

**描述:**
行表头、列表头的字体大小

---

### headerFontColor

**类型:** `string | undefined`

**描述:**
行表头、列表头的字体颜色

---

### headerBackgroundColor

**类型:** `string | undefined`

**描述:**
行表头、列表头的背景颜色

---

### hoverHeaderBackgroundColor

**类型:** `string | undefined`

**描述:**
鼠标悬浮在行、列表头的单元格时的背景颜色, 用于突出显示鼠标所在的行列交叉的单元格

---

### hoverHeaderInlineBackgroundColor

**类型:** `string | undefined`

**描述:**
鼠标悬浮在行、列表头的单元格时, 用于突出显示鼠标所在的行与列的所有单元格

---

### selectedBorderColor

**类型:** `string | undefined`

**描述:**
选中的单元格的边框颜色, 用于突出显示选中的单元格

---

### selectedBackgroundColor

**类型:** `string | undefined`

**描述:**
选中的单元格的背景颜色, 用于突出显示选中的单元格

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