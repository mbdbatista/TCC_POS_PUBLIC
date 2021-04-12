import { ValidationError } from 'class-validator'
import { Request, Response, NextFunction } from 'express'

export const ErrorMiddleware = (error: BaseError | ValidationError[], _: Request, res: Response, __: NextFunction) => {
  if (error instanceof Array && error.length && error[0] instanceof ValidationError) {
    const errorValidation = error as ValidationError[]
    const response = errorValidation.map(item => {
      return {
        property: item.property,
        rules: item.constraints
      }
    })
    return res.status(400).send({
      error: response
    })
  }


  if ((error as BaseError).code) {
    return res.status(400).send({ error: error })
  }

  return res.send(error)
}

class BaseError {
  code!: string
}