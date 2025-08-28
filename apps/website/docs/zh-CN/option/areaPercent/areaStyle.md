# areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

**Description:**
面积图元样式
  
  面积图元样式配置, 用于定义图表的面积图元样式, 包括面积图元的颜色, 透明度, 边框等.
  支持全局样式或条件样式配置
  数据筛选器
  若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
  若未配置selector, 则样式全局生效.


## selector

**Type:** `Selector | Selectors | undefined`

**Description:**
数据选择器
  
  若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
  若未配置selector, 则样式全局生效.


### field

**Type:** `string`

**Description:**
No description

### operator

**Type:** `"in" | "not in" | undefined`

**Description:**
No description

### op

**Type:** `"in" | "not in" | undefined`

**Description:**
No description

### value

**Type:** `string | number | (string | number)[]`

**Description:**
No description

## areaColor

**Type:** `string | undefined`

**Description:**
面积图元的颜色
  
  面积图元的颜色

## areaColorOpacity

**Type:** `number | undefined`

**Description:**
面积图元的颜色透明度
  
  面积图元的颜色透明度

