import Container from 'typedi'
import { Express, Request, Response, NextFunction } from 'express'
import { AuthMidleware } from '../../middlewares/auth.middleware'
import { InitInput } from '../../utility/initInput'
import { BaseRouter } from '../base/baseRouter'
import { GetCreatedUsersReportInput } from '../../../3-controller/serializers/report/getCreatedUsersReport/getCreatedUsersReportInput'
import { GetCreatedUsersReportOperator } from '../../../3-controller/operations/report/getCreatedUsersReportOperator'
import { GetFishBreedingReportOperator } from '../../../3-controller/operations/report/getFishBreedingReportOperator'
import { GetFishBreedingReportInput } from '../../../3-controller/serializers/report/getFishBreedingReport/getFishBreedingReportInput'
import { GetCreatedFishSpeciesReportOperator } from '../../../3-controller/operations/report/getCreatedFishSpeciesReportOperator'
import { GetCreatedFishSpeciesReportInput } from '../../../3-controller/serializers/report/getCreatedFishSpeciesReport/getCreatedFishSpeciesReportInput'
import { GetCreatedPondsReportOperator } from '../../../3-controller/operations/report/getCreatedPondsReportOperator'
import { GetCreatedPondsReportInput } from '../../../3-controller/serializers/report/getCreatedPondsReport/getCreatedPondsReportInput'

export default class ReportRouter extends BaseRouter {
  constructor(express: Express) {
    super()
    express.use('/report', this.router)
  }

  setupRoutes(): void {
    this.router.get('/createdUsers', AuthMidleware, this.getCreatedUsers)
    this.router.get('/createdPonds', AuthMidleware, this.getCreatedPonds)
    this.router.get('/createdFishSpecies', AuthMidleware, this.getCreatedFishSpecies)
    this.router.get('/fishBreeding', AuthMidleware, this.getFishBreeding)
  }
  public async getCreatedUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(GetCreatedUsersReportInput, req)
      const operator = Container.get(GetCreatedUsersReportOperator)
      const resp = await operator.run(input)
      next(resp)
    } catch (error) {
      next(error)
    }
  }
  public async getCreatedPonds(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(GetCreatedPondsReportInput, req)
      const operator = Container.get(GetCreatedPondsReportOperator)
      const resp = await operator.run(input)
      next(resp)
    } catch (error) {
      next(error)
    }
  }
  public async getCreatedFishSpecies(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(GetCreatedFishSpeciesReportInput, req)
      const operator = Container.get(GetCreatedFishSpeciesReportOperator)
      const resp = await operator.run(input)
      next(resp)
    } catch (error) {
      next(error)
    }
  }
  public async getFishBreeding(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(GetFishBreedingReportInput, req)
      const operator = Container.get(GetFishBreedingReportOperator)
      const resp = await operator.run(input)
      next(resp)
    } catch (error) {
      next(error)
    }
  }
}