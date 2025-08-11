import { z } from 'zod'
import { zAnnotationPoint } from './annotationPoint'
import { zAnnotationVerticalLine } from './annotationVerticalLine'
import { zAnnotationHorizontalLine } from './annotationHorizontalLine'
import { zAnnotationArea } from './annotationArea'

export const zAnnotation = z.object({
  annotationPoint: zAnnotationPoint.or(z.array(zAnnotationPoint)).optional(),
  annotationVerticalLine: zAnnotationVerticalLine.or(z.array(zAnnotationVerticalLine)).optional(),
  annotationHorizontalLine: zAnnotationHorizontalLine.or(z.array(zAnnotationHorizontalLine)).optional(),
  annotationArea: zAnnotationArea.or(z.array(zAnnotationArea)).optional(),
})

export type Annotation = z.infer<typeof zAnnotation>
