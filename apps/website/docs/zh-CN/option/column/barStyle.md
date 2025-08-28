# barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

**描述:**
矩形图元样式
  
  条形图样式配置, 用于定义图表的条形图样式, 包括条形图的颜色, 边框, 圆角等.
  支持全局样式或条件样式配置
  数据筛选器
  若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
  若未配置selector, 则样式全局生效.

**示例:**
无示例


## selector

**Type:** `Selector | Selectors | undefined`

**描述:**
数据选择器
  
  若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
  若未配置selector, 则样式全局生效.

**示例:**
数值选择器
  selector = "tool"
  selector = ["tool", "book"]
  selector = 100
  selector = [100, 200]
  
  局部数据选择器
  selector = { profit: 100 }
  selector = [{ profit: 100 }, { profit: 200 }]
  
  条件维度选择器
  selector = {
  field: 'category',
  operator: 'in',
  value: 'tool'
  }
  selector = {
  field: 'category',
  operator: 'not in',
  value: 'book'
  }
  
  条件指标选择器
  selector = {
  field: 'profit',
  operator: '>=',
  value: 100
  }
  selector = {
  field: 'profit',
  operator: 'between'
  value: [100, 300]
  }


### field

**Type:** `string`

**描述:**
No description

**示例:**
无示例

### operator

**Type:** `"in" | "not in" | undefined`

**描述:**
No description

**示例:**
无示例

### op

**Type:** `"in" | "not in" | undefined`

**描述:**
No description

**示例:**
无示例

### value

**Type:** `string | number | (string | number)[]`

**描述:**
No description

**示例:**
无示例

## barColor

**Type:** `string | undefined`

**描述:**
柱状图颜色
  
  柱状图颜色

**示例:**
无示例

## barColorOpacity

**Type:** `number | undefined`

**描述:**
柱状图颜色透明度
  
  柱状图颜色透明度

**示例:**
无示例

## barBorderColor

**Type:** `string | undefined`

**描述:**
柱状图边框颜色
  
  柱状图边框颜色

**示例:**
无示例

## barBorderWidth

**Type:** `number | undefined`

**描述:**
柱状图边框宽度
  
  柱状图边框宽度

**示例:**
无示例

## barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

**描述:**
柱状图边框样式
  
  柱状图边框样式

**示例:**
solid
  
  dashed
  
  dotted

## barRadius

**Type:** `number | number[] | undefined`

**描述:**
柱状图圆角
  
  柱状图圆角

**示例:**
4
  
  [0, 0, 10, 10]

