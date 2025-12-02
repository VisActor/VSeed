import type { ISpec, IMarkPointSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, Selector, Selectors, SpecPipelineContext, VChartSpecPipe, VSeed } from 'src/types'
import { isSubset } from './utils'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'
import { isBarLikeChart } from 'src/pipeline/utils/chatType'

export const generateAnnotationPointPipe = (options: {
  findSelectedDatas?: (
    dataset: Datum[],
    selector: Selector | Selectors | undefined | null,
    spec: ISpec,
    context: SpecPipelineContext,
  ) => Datum[]
  generateMarkPoint?: (datum: Datum, spec: ISpec, context: SpecPipelineContext) => IMarkPointSpec[] | undefined
}) => {
  const findSelectedDatas = options.findSelectedDatas ?? ((dataset, s) => dataset.filter((datum) => selector(datum, s)))
  const generateMarkPoint =
    options.generateMarkPoint ??
    ((datum: Datum) => {
      return [
        {
          coordinate: (data: Datum[]) => {
            return data.find((item) => isSubset(datum, item))
          },
        },
      ]
    })

  return ((spec: ISpec, context: SpecPipelineContext) => {
    const { advancedVSeed, vseed } = context
    const { annotation, config } = advancedVSeed

    if (!annotation || !annotation.annotationPoint) {
      return spec
    }

    const theme = config?.[vseed.chartType as 'column']?.annotation?.annotationPoint
    const { annotationPoint } = annotation
    const annotationPointList = Array.isArray(annotationPoint) ? annotationPoint : [annotationPoint]
    const isHorizontalBar = isBarLikeChart(advancedVSeed as VSeed)
    const defaultStyle = isHorizontalBar
      ? {
          textAlign: 'right',
          textBaseline: 'middle',
        }
      : {
          textAlign: 'center',
          textBaseline: 'top',
        }

    const markPoint = annotationPointList.flatMap((annotationPoint) => {
      const {
        selector: selectorPoint,
        text = '',
        textColor = theme?.textColor ?? '#ffffff',
        textFontSize = theme?.textFontSize ?? 12,
        textFontWeight = theme?.textFontWeight ?? 400,
        textAlign = defaultStyle.textAlign,
        textBaseline = defaultStyle.textBaseline,
        textBackgroundBorderColor = theme?.textBackgroundBorderColor,
        textBackgroundBorderRadius = theme?.textBackgroundBorderRadius ?? 4,
        textBackgroundBorderWidth = theme?.textBackgroundBorderWidth ?? 1,
        textBackgroundColor = theme?.textBackgroundColor ?? '#212121',
        textBackgroundPadding = theme?.textBackgroundPadding ?? 2,
        textBackgroundVisible = theme?.textBackgroundVisible ?? true,
        offsetX = theme?.offsetX ?? 0,
        offsetY = theme?.offsetY ?? 0,
      } = annotationPoint

      const dataset = advancedVSeed.dataset.flat()
      const selectedData = selectorPoint ? findSelectedDatas(dataset, selectorPoint, spec, context) : []
      const dx = -10 - (isHorizontalBar ? (textFontSize as number) : 0) // 由于vchart tag实现问题，需要设置这个强制偏移量
      const dy = isHorizontalBar ? 0 : (textFontSize as number)
      const markPointStyle = {
        zIndex: ANNOTATION_Z_INDEX,
        regionRelative: true,
        itemLine: {
          visible: false,
        },
        itemContent: {
          offsetY,
          offsetX,
          confine: true,
          text: {
            text: text,
            style: {
              opacity: 0.95,
              visible: true,
              textAlign: textAlign,
              textBaseline: textBaseline,
              fill: textColor,
              stroke: textBackgroundColor,
              lineWidth: 1,
              fontSize: textFontSize,
              fontWeight: textFontWeight,
              dx,
              dy,
            },
            labelBackground: {
              visible: textBackgroundVisible,
              padding: textBackgroundPadding,
              style: {
                opacity: 0.95,
                cornerRadius: textBackgroundBorderRadius ?? 4,
                fill: textBackgroundColor,
                stroke: textBackgroundBorderColor,
                lineWidth: textBackgroundBorderWidth,
                dx,
                dy,
              },
            },
          },
        },
      } as Partial<IMarkPointSpec>

      return selectedData.reduce((res: IMarkPointSpec[], datum) => {
        const marks = generateMarkPoint(datum, spec, context)

        if (marks && marks.length) {
          marks.forEach((mark) => {
            res.push({
              ...markPointStyle,
              ...mark,
            } as IMarkPointSpec)
          })
        }

        return res
      }, [])
    }) as unknown as IMarkPointSpec[]

    return {
      ...spec,
      markPoint,
    } as ISpec
  }) as VChartSpecPipe
}
