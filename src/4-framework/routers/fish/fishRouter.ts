import { Express, Request, Response, NextFunction } from 'express'
import Container from 'typedi';
import { CreateFishSpecieOperator } from '../../../3-controller/operations/fish/specie/createFishSpecieOperator';
import { DeleteFishSpecieOperator } from '../../../3-controller/operations/fish/specie/deleteFishSpecieOperator';
import { ExportFishSpecieOperator } from '../../../3-controller/operations/fish/specie/exportFishSpecieOperator';
import { FindOneFishSpecieOperator } from '../../../3-controller/operations/fish/specie/findOneFishSpecieOperator';
import { ListFishSpecieOperator } from '../../../3-controller/operations/fish/specie/listFishSpecieOperator';
import { UpdateFishSpecieOperator } from '../../../3-controller/operations/fish/specie/updateFishSpecieOperator';
import { CreateFishSpecieInput } from '../../../3-controller/serializers/fish/specie/createFishSpecie/createFishSpecieInput';
import { DeleteFishSpecieInput } from '../../../3-controller/serializers/fish/specie/deleteFishSpecie/deleteFishSpecieInput';
import { ExportFishSpecieInput } from '../../../3-controller/serializers/fish/specie/exportFishSpecie/exportFishSpecieInput';
import { FindOneFishSpecieInput } from '../../../3-controller/serializers/fish/specie/findOneFishSpecie/findOneFishSpecieInput';
import { ListFishSpecieInput } from '../../../3-controller/serializers/fish/specie/listFishSpecie/listFishSpecieInput';
import { UpdateFishSpecieInput } from '../../../3-controller/serializers/fish/specie/updateFishSpecie/updateFishSpecieInput';
import { AuthMidleware } from '../../middlewares/auth.middleware';
import { InitInput } from '../../utility/initInput';
import { BaseRouter } from "../base/baseRouter";

export default class FishRouter extends BaseRouter {
  constructor(express: Express) {
    super()
    express.use('/fish', this.router)
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
      const input = InitInput(CreateFishSpecieInput, req)
      const operator = Container.get(CreateFishSpecieOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(ListFishSpecieInput, req)
      const operator = Container.get(ListFishSpecieOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(FindOneFishSpecieInput, req)
      const operator = Container.get(FindOneFishSpecieOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(UpdateFishSpecieInput, req)
      const operator = Container.get(UpdateFishSpecieOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(DeleteFishSpecieInput, req)
      const operator = Container.get(DeleteFishSpecieOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async export(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(ExportFishSpecieInput, req)
      const operator = Container.get(ExportFishSpecieOperator)
      const response = await operator.run(input)
      const { path, filename } = response.data!
      res.download(path, filename)
    } catch (error) {
      next(error)
    }
  }
}