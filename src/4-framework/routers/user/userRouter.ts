import Container from 'typedi';
import { Request, Response, Express, NextFunction } from 'express'
import { CreateUserOperator } from '../../../3-controller/operations/user/createUserOperator';
import { FindOneUserOperator } from '../../../3-controller/operations/user/findOneUserOperator';
import { BaseRouter } from "../base/baseRouter";
import { InitInput } from '../../utility/initInput';
import { CreateUserInput } from '../../../3-controller/serializers/user/create/createUserInput';
import { AuthMidleware } from '../../middlewares/auth.middleware';
import { FindAllUserInput } from '../../../3-controller/serializers/user/findAll/findAllUserInput';
import { FindAllUserOperator } from '../../../3-controller/operations/user/findAllUserOperator';
import { ExportUserInput } from '../../../3-controller/serializers/user/export/exportUserInput';
import { ExportUserOperator } from '../../../3-controller/operations/user/exportUserOperator';
import { UpdateUserInput } from '../../../3-controller/serializers/user/update/updateUserInput';
import { UpdateUserOperator } from '../../../3-controller/operations/user/updateUserOperator';
import { DeleteUserInput } from '../../../3-controller/serializers/user/delete/deleteUserInput';
import { DeleteUserOperator } from '../../../3-controller/operations/user/deleteUserOperator';
import { FindOneUserInput } from '../../../3-controller/serializers/user/findOne/findOneUserInput';

export default class UserRouter extends BaseRouter {
  constructor(express: Express) {
    super()
    express.use('/user', this.router)
  }

  setupRoutes(): void {
    this.router.post('/', this.create)
    this.router.get('/export', AuthMidleware, this.export)
    this.router.get('/', AuthMidleware, this.findAll)
    this.router.get('/:id', AuthMidleware, this.findOne)
    this.router.put('/:id', AuthMidleware, this.update)
    this.router.delete('/:id', AuthMidleware, this.delete)
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput<CreateUserInput>(CreateUserInput, req)
      const operator = Container.get(CreateUserOperator)
      const resp = await operator.run(input)
      next(resp)
    } catch (error) {
      next(error)
    }

  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(FindOneUserInput, req)
      const operator = Container.get(FindOneUserOperator)
      const resp = await operator.run(input)
      next(resp)
    } catch (error) {
      next(error)
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(FindAllUserInput, req)
      const operator = Container.get(FindAllUserOperator)
      const resp = await operator.run(input)
      next(resp)
    } catch (error) {
      next(error)
    }
  }

  async export(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(ExportUserInput, req)
      const operator = Container.get(ExportUserOperator)
      const response = await operator.run(input)
      const { path, filename } = response.data!
      res.download(path, filename)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(UpdateUserInput, req)
      const operator = Container.get(UpdateUserOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(DeleteUserInput, req)
      const operator = Container.get(DeleteUserOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }
}