/**
 * 图表框选配置
 */
export type Brush = {
  /**
   * 是否开启brush框选
   */
  enable?: boolean
  /**
   * brush的类型
   * @description 定义刷选框的形状和刷选方向
   * - `rect`: 矩形框选，可以在X轴和Y轴两个方向上同时进行框选
   * - `polygon`: 多边形框选，通过点击多个点绘制任意多边形进行框选
   * - `x`: X轴方向框选，只在X轴方向上进行框选，Y轴方向不限制
   * - `y`: Y轴方向框选，只在Y轴方向上进行框选，X轴方向不限制
   * @default 'rect'
   */
  brushType?: 'x' | 'y' | 'rect' | 'polygon'
  /**
   * 框选模式，单选还是多选
   * @description 定义刷选的模式
   * - `single`: 单选模式，每次只能有一个刷选框
   * - `multiple`: 多选模式，可以同时存在多个刷选框
   * @default 'single'
   */
  brushMode?: 'single' | 'multiple'
  /**
   * 框选结束是否清除选框
   */
  removeOnClick?: boolean
  /**
   * 被框选中的数据样式
   * @description 定义被刷选中的数据点的样式
   */
  inBrushStyle?: {
    /**
     * 不透明度
     * @description 被框选中的数据点的不透明度，取值范围 0-1
     */
    opacity?: number
    /**
     * 描边颜色
     */
    stroke?: string
    /**
     * 描边宽度
     */
    lineWidth?: number
  }
  /**
   * 未被框选中的数据样式
   * @description 定义未被刷选中的数据点的样式
   */
  outOfBrushStyle?: {
    /**
     * 不透明度
     * @description 未被框选中的数据点的不透明度，取值范围 0-1
     */
    opacity?: number
    /**
     * 描边颜色
     */
    stroke?: string
    /**
     * 描边宽度
     */
    lineWidth?: number
  }
}
