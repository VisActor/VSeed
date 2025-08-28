import { z } from 'zod'
import { zAnnotationPoint } from './annotationPoint'
import { zAnnotationVerticalLine } from './annotationVerticalLine'
import { zAnnotationHorizontalLine } from './annotationHorizontalLine'
import { zAnnotationArea } from './annotationArea'

export const zAnnotation = z.object({
  annotationPoint: zAnnotationPoint.or(z.array(zAnnotationPoint)).nullish(),
  annotationVerticalLine: zAnnotationVerticalLine.or(z.array(zAnnotationVerticalLine)).nullish(),
  annotationHorizontalLine: zAnnotationHorizontalLine.or(z.array(zAnnotationHorizontalLine)).nullish(),
  annotationArea: zAnnotationArea.or(z.array(zAnnotationArea)).nullish(),
})

export type Annotation = z.infer<typeof zAnnotation>
