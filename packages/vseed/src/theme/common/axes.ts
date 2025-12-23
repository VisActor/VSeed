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
    titleColor: '#606773',
    titleFontSize: 12,
    titleFontWeight: 400,
  },
  grid: {
    visible: true,
    gridColor: '#E3E5EB',
    gridWidth: 0.5,
    gridLineDash: [4, 2],
  },
  tick: {
    visible: false,
    tickInside: false,
    tickSize: 4,
    tickColor: '#E3E5EB',
  },
  line: {
    visible: false,
    lineColor: '#E3E5EB',
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
    titleColor: '#606773',
    titleFontSize: 12,
    titleFontWeight: 400,
  },
  grid: {
    visible: false,
    gridColor: '#E3E5EB',
    gridWidth: 0.5,
    gridLineDash: [4, 2],
  },
  tick: {
    visible: false,
    tickInside: false,
    tickSize: 4,
    tickColor: '#E3E5EB',
  },
  line: {
    visible: true,
    lineColor: '#E3E5EB',
    lineWidth: 1,
  },
})

export const getDarkLinearAxis = (): YLinearAxis => ({
  nice: true,
  zero: true,
  label: {
    visible: true,
    labelAngle: 0,
    labelColor: '#888C93',
    labelFontSize: 12,
    labelFontWeight: 400,
  },
  title: {
    visible: false,
    titleColor: '#BBBDC3',
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
    tickColor: '#303339',
  },
  line: {
    visible: false,
    lineColor: '#303339',
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
    labelColor: '#888C93',
    labelFontSize: 12,
    labelFontWeight: 400,
  },
  title: {
    visible: false,
    titleColor: '#BBBDC3',
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
    tickColor: '#303339',
  },
  line: {
    visible: true,
    lineColor: '#303339',
    lineWidth: 1,
  },
})
