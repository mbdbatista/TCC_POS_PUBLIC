export type BaseError = {
  code: string
}

export abstract class BaseOperator<I, O> {
  abstract run(input: I): Promise<O>
}