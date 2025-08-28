# pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

**描述:**
点图元样式
  
  点图元样式配置, 用于定义图表的点图元样式, 包括点图元的颜色, 边框等.
  支持全局样式或条件样式配置
  数据筛选器
  若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
  若未配置selector, 则样式全局生效.


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

### operator

**Type:** `"in" | "not in" | undefined`

### op

**Type:** `"in" | "not in" | undefined`

### value

**Type:** `string | number | (string | number)[]`

## pointSize

**Type:** `number | undefined`

**描述:**
点大小
  
  点大小

## pointColor

**Type:** `string | undefined`

**描述:**
点图元颜色
  
  点图元颜色

## pointColorOpacity

**Type:** `number | undefined`

**描述:**
点图元颜色透明度
  
  点图元颜色透明度

## pointBorderColor

**Type:** `string | undefined`

**描述:**
点图元边框颜色
  
  点图元边框颜色

## pointBorderWidth

**Type:** `number | undefined`

**描述:**
点图元边框宽度
  
  点图元边框宽度

## pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

**描述:**
点图元边框样式
  
  点图元边框样式

**示例:**
solid
  
  dashed
  
  dotted

