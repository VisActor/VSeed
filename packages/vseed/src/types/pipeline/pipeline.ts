export type Pipe<T, U> = (result: Partial<T>, context: U) => Partial<T>

export type ExecPipelineType = <T, U>(
  pipeline: Array<Pipe<T, U>>,
  context: U,
  initialValue?: Partial<T>,
) => T
