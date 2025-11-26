export const getLightColorScheme = () => [
  '#8D72F6',
  '#5766EC',
  '#66A3FE',
  '#51D5E6',
  '#4EC0B3',
  '#F9DF90',
  '#F9AD71',
  '#ED8888',
  '#E9A0C3',
  '#D77DD3',
]
export const getDarkColorScheme = () => [
  '#2E62F1',
  '#4DC36A',
  '#FF8406',
  '#FFCC00',
  '#4F44CF',
  '#5AC8FA',
  '#003A8C',
  '#B08AE2',
  '#FF6341',
  '#98DD62',
]
export const getLightLinearColorScheme = () => ['#C2CEFF', '#5766EC']
export const getDarkLinearColorScheme = () => ['#A0CEFF', '#2E62F1']
export const getLightColor = () => ({
  linearColorScheme: getLightLinearColorScheme(),
  colorScheme: getLightColorScheme(),
  positiveColor: '#7E5DFF',
  negativeColor: '#EB3373',
})
export const getDarkColor = () => ({
  linearColorScheme: getDarkLinearColorScheme(),
  colorScheme: getDarkColorScheme(),
  positiveColor: '#7E5DFF',
  negativeColor: '#EB3373',
})
