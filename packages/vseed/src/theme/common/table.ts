export const getDefaultTableConfig = () => ({
  bodyFontSize: 12,
  bodyBackgroundColor: 'transparent',
  headerFontSize: 12,
})

export const getLightTableConfig = () => ({
  ...getDefaultTableConfig(),
  borderColor: '#e3e5eb',

  bodyFontColor: '#141414',

  headerFontColor: '#21252c',
  headerBackgroundColor: '#f6f7f9',

  hoverBodyBackgroundColor: '#bedaff',
  hoverBodyInlineBackgroundColor: '#bedaff33',
  hoverHeaderBackgroundColor: '#D9DDE4',
  hoverHeaderInlineBackgroundColor: '#D9DDE455',

  selectedBorderColor: '#4080ff',
  selectedBackgroundColor: '#bedaff33',

  backgroundColor: 'transparent',
})

export const getDarkTableConfig = () => ({
  ...getDefaultTableConfig(),
  borderColor: '#4b4e53',

  bodyFontColor: '#fdfdfd',
  headerFontColor: '#fdfdfd',
  headerBackgroundColor: '#36393e',

  hoverBodyBackgroundColor: '#4284ff66',
  hoverBodyInlineBackgroundColor: '#4284ff10',
  hoverHeaderBackgroundColor: '#6f7984cc',
  hoverHeaderInlineBackgroundColor: '#4b4f54',

  selectedBorderColor: '#3073f2',
  selectedBackgroundColor: '#4284ff33',
})

const pickPivotChartGridConfig = (tableConfig: any) => {
  return {
    outlineBorderLineWidth: 0,
    frameCornerRadius: 0,
    borderColor: tableConfig.borderColor,
    bodyFontColor: tableConfig.bodyFontColor,
    headerFontColor: tableConfig.headerFontColor,
    headerBackgroundColor: 'transparent',
    hoverHeaderBackgroundColor: tableConfig.hoverHeaderBackgroundColor,
    hoverHeaderInlineBackgroundColor: tableConfig.hoverHeaderInlineBackgroundColor,
  }
}

export const getLightPivotChartGridConfig = () => {
  return pickPivotChartGridConfig(getLightTableConfig())
}

export const getDarkPivotChartGridConfig = () => {
  return pickPivotChartGridConfig(getDarkTableConfig())
}
