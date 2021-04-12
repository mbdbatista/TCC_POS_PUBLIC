import Container from 'typedi';
import { Request, Response, Express, NextFunction } from 'express'
import { BaseRouter } from "../base/baseRouter";
import { LoginOperator } from '../../../3-controller/operations/authentication/loginOperator';
import { SocialLoginOperator } from '../../../3-controller/operations/authentication/socialLoginOperator';
import { InitInput } from '../../utility/initInput';
import { LoginInput } from '../../../3-controller/serializers/authentication/login/loginInput';

export default class AuthenticationRouter extends BaseRouter {
  constructor(express: Express) {
    super()
    express.use('/auth', this.router)
  }

  setupRoutes(): void {
    this.router.post('/login', this.login)
    this.router.post('/socialLogin', this.socialLogin)
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(LoginInput, req)
      const operator = Container.get(LoginOperator)
      const resp = await operator.run(input)
      next(resp)
    } catch (error) {
      next(error)
    }
  }

  public async socialLogin(req: Request, res: Response, next: NextFunction) {
    const operator = Container.get(SocialLoginOperator)
    const resp = await operator.run(req.body)
    next(resp)
  }
}