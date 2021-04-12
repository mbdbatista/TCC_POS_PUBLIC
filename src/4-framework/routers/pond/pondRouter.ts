import { Express, Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import { CreatePondOperator } from '../../../3-controller/operations/pond/createPondOperator'
import { DeletePondOperator } from '../../../3-controller/operations/pond/deletePondOperator'
import { ExportPondOperator } from '../../../3-controller/operations/pond/exportPondOperator'
import { FindAllPondOperator } from '../../../3-controller/operations/pond/findAllPondOperator'
import { FindOnePondOperator } from '../../../3-controller/operations/pond/findOnePondOperator'
import { UpdatePondOperator } from '../../../3-controller/operations/pond/updatePondOperator'
import { CreatePondInput } from '../../../3-controller/serializers/pond/create/createPondInput'
import { DeletePondInput } from '../../../3-controller/serializers/pond/delete/deletePondInput'
import { ExportPondInput } from '../../../3-controller/serializers/pond/export/exportPondInput'
import { FindAllPondInput } from '../../../3-controller/serializers/pond/findAll/findAllPondInput'
import { FindOnePondInput } from '../../../3-controller/serializers/pond/findOne/findOnePondInput'
import { UpdatePondInput } from '../../../3-controller/serializers/pond/update/updatePondInput'
import { AuthMidleware } from '../../middlewares/auth.middleware'
import { InitInput } from '../../utility/initInput'
import { BaseRouter } from "../base/baseRouter"

export default class PondRouter extends BaseRouter {
  constructor(express: Express) {
    super()
    express.use('/pond', this.router)
  }
  setupRoutes(): void {
    this.router.post('/', AuthMidleware, this.create)
    this.router.get('/export', AuthMidleware, this.export)
    this.router.get('/', AuthMidleware, this.findAll)
    this.router.get('/:id', AuthMidleware, this.findOne)
    this.router.put('/:id', AuthMidleware, this.update)
    this.router.delete('/:id', AuthMidleware, this.delete)
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(CreatePondInput, req)
      const operator = Container.get(CreatePondOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(FindAllPondInput, req)
      const operator = Container.get(FindAllPondOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(FindOnePondInput, req)
      const operator = Container.get(FindOnePondOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(UpdatePondInput, req)
      const operator = Container.get(UpdatePondOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(DeletePondInput, req)
      const operator = Container.get(DeletePondOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async export(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(ExportPondInput, req)
      const operator = Container.get(ExportPondOperator)
      const response = await operator.run(input)
      const { path, filename } = response.data!
      res.download(path, filename)
    } catch (error) {
      next(error)
    }
  }
}