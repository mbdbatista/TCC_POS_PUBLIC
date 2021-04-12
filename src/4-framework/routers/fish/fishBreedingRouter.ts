import { Express, Request, Response, NextFunction } from 'express'
import Container from 'typedi'
import { CreateFishBreedingOperator } from '../../../3-controller/operations/fish/breeding/createFishBreedingOperator'
import { ExportFishBreedingOperator } from '../../../3-controller/operations/fish/breeding/exportFishBreedingOperator'
import { FindAllFishBreedingOperator } from '../../../3-controller/operations/fish/breeding/findAllFishBreedingOperator'
import { FindOneFishBreedingOperator } from '../../../3-controller/operations/fish/breeding/findOneFishBreedingOperator'
import { UpdateFishBreedingOperator } from '../../../3-controller/operations/fish/breeding/updateFishBreedingOperator'
import { CreateFishBreedingInput } from '../../../3-controller/serializers/fish/breeding/create/createFishBreedingInput'
import { ExportFishBreedingInput } from '../../../3-controller/serializers/fish/breeding/export/exportFishBreedingInput'
import { FindAllFishBreedingInput } from '../../../3-controller/serializers/fish/breeding/findAll/findAllFishBreedingInput'
import { FindOneFishBreedingInput } from '../../../3-controller/serializers/fish/breeding/findOne/findOneFishBreedingInput'
import { UpdateFishBreedingInput } from '../../../3-controller/serializers/fish/breeding/update/updateFishBreedingInput'
import { AuthMidleware } from '../../middlewares/auth.middleware'
import { InitInput } from '../../utility/initInput'
import { BaseRouter } from "../base/baseRouter"

export default class FishBreedingRouter extends BaseRouter {
  constructor(express: Express) {
    super()
    express.use('/fish-breeding', this.router)
  }
  setupRoutes(): void {
    this.router.post('/', AuthMidleware, this.create)
    this.router.get('/export', AuthMidleware, this.export)
    this.router.get('/', AuthMidleware, this.findAll)
    this.router.get('/:id', AuthMidleware, this.findOne)
    this.router.put('/:id', AuthMidleware, this.update)
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(CreateFishBreedingInput, req)
      const operator = Container.get(CreateFishBreedingOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(FindAllFishBreedingInput, req)
      const operator = Container.get(FindAllFishBreedingOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(FindOneFishBreedingInput, req)
      const operator = Container.get(FindOneFishBreedingOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(UpdateFishBreedingInput, req)
      const operator = Container.get(UpdateFishBreedingOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async export(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(ExportFishBreedingInput, req)
      const operator = Container.get(ExportFishBreedingOperator)
      const response = await operator.run(input)
      const { path, filename } = response.data!
      res.download(path, filename)
    } catch (error) {
      next(error)
    }
  }
}