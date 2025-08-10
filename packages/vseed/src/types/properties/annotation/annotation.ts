import { z } from 'zod'
import { zAnnotationPoint } from './annotationPoint'

export const zAnnotation = z.object({
  annotationPoint: zAnnotationPoint.or(z.array(zAnnotationPoint)).optional(),
})

export type Annotation = z.infer<typeof zAnnotation>
