# table
## 描述
表格，适用于详细数据展示场景，行列分明，便于查看具体数值
适用场景:
- 需要展示详细数据明细
- 数据项需要精确比对
- 展示多维度数据属性
数据要求:
- 至少1个维度字段
- 至少1个度量字段
- 维度字段会作为表格的列标题
默认开启的功能:
- 默认开启排序、筛选、分页功能


## 属性

### chartType

**类型:** `"table"`

**描述:**
标准表格组件，用于展示详细数据

---

### backgroundColor

**类型:** `BackgroundColor`

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
列表头的字体大小

---

### headerFontColor

**类型:** `string | undefined`

**描述:**
列表头的字体颜色

---

### headerBackgroundColor

**类型:** `string | undefined`

**描述:**
列表头的背景颜色

---

### hoverHeaderBackgroundColor

**类型:** `string | undefined`

**描述:**
鼠标悬浮在列表头的单元格时的背景颜色, 用于突出显示鼠标所在的单元格

---

### hoverHeaderInlineBackgroundColor

**类型:** `string | undefined`

**描述:**
鼠标悬浮在列表头的时, 整行的单元格的背景颜色, 用于突出显示鼠标所在的行

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

**类型:** `Theme | undefined`

**描述:**
图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置, 内置light与dark两种主题, 用户可以通过Builder自定义主题

---

### locale

**类型:** `Locale | undefined`

**描述:**
图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言