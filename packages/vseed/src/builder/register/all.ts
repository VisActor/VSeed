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
  registerHeatmap,
  registerRadar,
  registerDualAxis,
} from './chartType'
import { registerDarkTheme, registerLightTheme } from './theme'

export const registerAll = () => {
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
  registerScatter()
  registerDualAxis()
  // polar
  registerPie()
  registerDonut()
  registerRose()
  registerRoseParallel()
  registerRadar()
  // other
  registerFunnel()
  registerHeatmap()
  // theme
  registerLightTheme()
  registerDarkTheme()
}
