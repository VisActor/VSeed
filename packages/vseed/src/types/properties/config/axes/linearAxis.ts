import { type Axis } from './axis'

export type XLinearAxis = Omit<
  Axis,
  | 'labelAutoHide'
  | 'labelAutoHideGap'
  | 'labelAutoRotate'
  | 'labelAutoRotateAngleRange'
  | 'labelAutoLimit'
  | 'labelAutoLimitLength'
>
export type YLinearAxis = Omit<
  Axis,
  | 'labelAutoHide'
  | 'labelAutoHideGap'
  | 'labelAutoRotate'
  | 'labelAutoRotateAngleRange'
  | 'labelAutoLimit'
  | 'labelAutoLimitLength'
>
