# dimensions

**Type:** `Dimensions | undefined`

:::tip{title=描述}
透视表的行维度和列维度，会自动对数据进行处理为树形结构, 并映射到行和列轴, 可以通过 location : "rowDimension" | "columnDimension" 来控制一维度的映射位置:::


 

**示例:**
[{id: 'region', alias: '地区', isRow: true}, {id: 'product', alias: '产品', isColumn: true}]


 


## id

**Type:** `string`

## alias

**Type:** `string | undefined`

## location

**Type:** `"dimension" | "rowDimension" | "columnDimension" | undefined`

