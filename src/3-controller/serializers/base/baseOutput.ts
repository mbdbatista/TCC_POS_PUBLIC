export type BaseError = {
  code: string
}


export class BaseOutput<T> { 
  data?: T;
  error?: BaseError;
}