import {
  registerArea,
  registerAreaPercent,
  registerBar,
  registerBarParallel,
  registerBarPercent,
  registerColumn,
  registerColumnParallel,
  registerColumnPercent,
  registerLine,
  registerPie,
  registerDonut,
  registerRose,
  registerRoseParallel,
  registerFunnel,
  registerScatter,
  registerTable,
  registerPivotTable,
  registerAreaRange,
  registerHeatmap,
  registerRadar,
} from './chartType'
import { registerDarkTheme, registerLightTheme } from './theme'

export const registerAll = () => {
  /**
   * ------------------
   * ChartTypes
   * ------------------
   */

  // table
  registerTable()
  registerPivotTable()
  // cartesian
  registerLine()
  registerColumn()
  registerColumnParallel()
  registerColumnPercent()
  registerBar()
  registerBarParallel()
  registerBarPercent()
  registerArea()
  registerAreaPercent()
  registerAreaRange()
  registerScatter()
  // polar
  registerPie()
  registerDonut()
  registerRose()
  registerRoseParallel()
  registerRadar()
  // other
  registerFunnel()
  registerHeatmap()

  /**
   * ------------------
   * Theme
   * ------------------
   */
  registerLightTheme()
  registerDarkTheme()
}
