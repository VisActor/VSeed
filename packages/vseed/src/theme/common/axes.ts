import type { YBandAxis, YLinearAxis } from 'src/types'

export const getLightLinearAxis = (): YLinearAxis => ({
  nice: true,
  zero: true,
  inverse: false,
  label: {
    visible: true,
    labelAngle: 0,
    labelColor: '#8F959E',
    labelFontSize: 12,
    labelFontWeight: 400,
  },
  title: {
    visible: false,
    titleText: '',
    titleColor: '#646A73',
    titleFontSize: 12,
    titleFontWeight: 400,
  },
  grid: {
    visible: true,
    gridColor: '#36415926',
    gridWidth: 0.5,
    gridLineDash: [4, 2],
  },
  tick: {
    visible: false,
    tickInside: false,
    tickSize: 4,
    tickColor: '#3641594d',
  },
  line: {
    visible: false,
    lineColor: '#3641594d',
    lineWidth: 1,
  },
})

export const getLightBandAxis = (): YBandAxis => ({
  labelAutoHide: true,
  labelAutoHideGap: 4,
  labelAutoLimit: true,
  labelAutoLimitLength: 80,
  labelAutoRotate: false,
  labelAutoRotateAngleRange: [0, -45, -90],
  label: {
    visible: true,
    labelAngle: 0,
    labelColor: '#8F959E',
    labelFontSize: 12,
    labelFontWeight: 400,
  },
  title: {
    visible: false,
    titleText: '',
    titleColor: '#646A73',
    titleFontSize: 12,
    titleFontWeight: 400,
  },
  grid: {
    visible: false,
    gridColor: '#36415926',
    gridWidth: 0.5,
    gridLineDash: [4, 2],
  },
  tick: {
    visible: false,
    tickInside: false,
    tickSize: 4,
    tickColor: '#3641594d',
  },
  line: {
    visible: true,
    lineColor: '#3641594d',
    lineWidth: 1,
  },
})

export const getDarkLinearAxis = (): YLinearAxis => ({
  nice: true,
  zero: true,
  label: {
    visible: true,
    labelAngle: 0,
    labelColor: '#E2E3E6',
    labelFontSize: 12,
    labelFontWeight: 400,
  },
  title: {
    visible: false,
    titleText: '',
    titleColor: '#FDFDFD',
    titleFontSize: 12,
    titleFontWeight: 400,
  },
  grid: {
    visible: true,
    gridColor: '#303339',
    gridWidth: 0.5,
    gridLineDash: [4, 2],
  },
  tick: {
    visible: false,
    tickInside: false,
    tickSize: 4,
    tickColor: '#4B4F54',
  },
  line: {
    visible: false,
    lineColor: '#4B4F54',
    lineWidth: 1,
  },
})

export const getDarkBandAxis = (): YBandAxis => ({
  labelAutoHide: true,
  labelAutoHideGap: 4,
  labelAutoLimit: true,
  labelAutoLimitLength: 80,
  labelAutoRotate: false,
  labelAutoRotateAngleRange: [0, -45, -90],
  label: {
    visible: true,
    labelAngle: 0,
    labelColor: '#E2E3E6',
    labelFontSize: 12,
    labelFontWeight: 400,
  },
  title: {
    visible: false,
    titleText: '',
    titleColor: '#FDFDFD',
    titleFontSize: 12,
    titleFontWeight: 400,
  },
  grid: {
    visible: false,
    gridColor: '#303339',
    gridWidth: 0.5,
    gridLineDash: [4, 2],
  },
  tick: {
    visible: false,
    tickInside: false,
    tickSize: 4,
    tickColor: '#4B4F54',
  },
  line: {
    visible: true,
    lineColor: '#4B4F54',
    lineWidth: 1,
  },
})
