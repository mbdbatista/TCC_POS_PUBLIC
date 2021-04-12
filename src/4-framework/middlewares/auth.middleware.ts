import { Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import { VerifyTokenOperator } from '../../3-controller/operations/authentication/verifyTokenOperator';
import { VerifyTokenInput } from '../../3-controller/serializers/authentication/verifyToken/verifyTokenInput';

export const AuthMidleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const input = new VerifyTokenInput({ token })
    if (!input.isValid()) {
      throw input.errors
    }
    const operator = Container.get(VerifyTokenOperator)
    const response = await operator.run(input)
    req.user = response.data
    next()
  } catch (error) {
    res.status(401).send({
      error: 'Unauthorized'
    })
  }
}