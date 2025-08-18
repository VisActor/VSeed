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
} from './chartType'
import { registerDarkTheme, registerLightTheme } from './theme'

export const registerAll = () => {
  // ChartType
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
  registerPie()
  registerDonut()
  registerRose()
  registerRoseParallel()
  registerFunnel()
  registerScatter()
  registerTable()
  registerPivotTable()

  // Theme
  registerLightTheme()
  registerDarkTheme()
}
