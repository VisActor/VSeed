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
  registerPie()
  registerDonut()
  registerRose()
  registerRoseParallel()

  // Theme
  registerLightTheme()
  registerDarkTheme()
}
