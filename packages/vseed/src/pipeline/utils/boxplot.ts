import { BoxPlotPivotIndicator } from 'src/dataReshape'

export const revisedBoxPlotFieldKey = (fieldKey: string, groupId: string, isPivotChart = true) => {
  if (!isPivotChart) {
    return fieldKey
  }
  return `${BoxPlotPivotIndicator}_${groupId}_${fieldKey}`
}
