// export type MeasureEncoding = {
//   /**
//    * @description 指标映射的主y轴, 仅用于双轴图
//    */
//   primaryYAxis: string | string[]
//   /**
//    * @description 指标映射的次y轴, 仅用于双轴图
//    */
//   secondaryYAxis: string | string[]

//   /**
//    * @description 指标映射的x轴, 适用于条形图、散点图
//    */
//   xAxis: string | string[]
//   /**
//    * @description 指标映射的y轴, 适用于柱状图、折线图、面积图、散点图
//    */
//   yAxis: string | string[]

//   /**
//    * @description 指标映射的角度, 适用于饼图、环形图、雷达图
//    */
//   angle: string | string[]

//   /**
//    * @description 指标映射的半径, 适用于玫瑰图
//    */
//   radius: string | string[]

//   /**
//    * @description 指标映射的大小, 适用于漏斗图、散点图
//    */
//   size: string | string[]

//   /**
//    * @description 指标映射的颜色, 适用于所有图表
//    */
//   color: string | string[]

//   /**
//    * @description 指标映射的标签, 适用于所有图表
//    */
//   label: string | string[]

//   /**
//    * @description 指标映射的提示, 适用于所有图表
//    */
//   tooltip: string | string[]
// }

/**
 * @description 指标映射的通道
 * - primaryYAxis: 指标映射的主y轴, 仅用于双轴图
 * - secondaryYAxis: 指标映射的次y轴, 仅用于双轴图
 * - xAxis: 指标映射的x轴, 适用于条形图、散点图
 * - yAxis: 指标映射的y轴, 适用于柱状图、折线图、面积图、散点图
 * - angle: 指标映射的角度, 适用于饼图、环形图、雷达图
 * - radius: 指标映射的半径, 适用于玫瑰图
 * - size: 指标映射的大小, 适用于漏斗图、散点图
 * - color: 指标映射的颜色, 适用于所有图表
 * - label: 指标映射的标签, 适用于所有图表
 * - tooltip: 指标映射的提示, 适用于所有图表
 */
export type MeasureEncoding =
  | 'primaryYAxis'
  | 'secondaryYAxis'
  | 'xAxis'
  | 'yAxis'
  | 'angle'
  | 'radius'
  | 'size'
  | 'color'
  | 'label'
  | 'tooltip'
