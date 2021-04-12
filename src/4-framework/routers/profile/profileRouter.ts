import Container from 'typedi'
import { Request, Response, Express, NextFunction, response } from 'express'
import { FindOneProfileOperator } from '../../../3-controller/operations/profile/findOneProfileOperator'
import { BaseRouter } from '../base/baseRouter'
import { CreateProfileOperator } from '../../../3-controller/operations/profile/createProfileOperator'
import { FindAllProfileOperator } from '../../../3-controller/operations/profile/findAllProfileOperator'
import { UpdateProfileOperator } from '../../../3-controller/operations/profile/updateProfileOperator'
import { DeleteProfileOperator } from '../../../3-controller/operations/profile/deleteProfileOperator'
import { InputCreateProfile } from '../../../3-controller/serializers/profile/create/inputCreateProfile'
import { InitInput } from '../../utility/initInput'
import { AuthMidleware } from '../../middlewares/auth.middleware'
import { FindUsersOperator } from '../../../3-controller/operations/profile/findUsersOperator'
import { FindUsersInput } from '../../../3-controller/serializers/profile/findUsers/findUsersInput'
import { InputFindOneProfile } from '../../../3-controller/serializers/profile/findOne/inputFindOneProfile'
import { InputFindAllProfile } from '../../../3-controller/serializers/profile/findAll/inputFindAllProfile'
import { InputDeleteProfile } from '../../../3-controller/serializers/profile/delete/inputDeleteProfile'
import { InputUpdateProfile } from '../../../3-controller/serializers/profile/update/inputUpdateProfile'
import { AssociateUsersInput } from '../../../3-controller/serializers/profile/associateUsers/associateUsersInput'
import { AssociateUsersOperator } from '../../../3-controller/operations/profile/associateUsersOperator'
import { InputExportProfile } from '../../../3-controller/serializers/profile/export/inputExportProfile'
import { ExportProfileOperator } from '../../../3-controller/operations/profile/exportProfileOperator'

export default class ProfileRouter extends BaseRouter {
  constructor(express: Express) {
    super()
    express.use('/profile', this.router)
  }
  setupRoutes(): void {
    this.router.get('/export', AuthMidleware, this.export)
    this.router.get('/', AuthMidleware, this.findAll)
    this.router.get('/:id', AuthMidleware, this.findOne)
    this.router.post('/', AuthMidleware, this.create)
    this.router.put('/:id', AuthMidleware, this.update)
    this.router.delete('/:id', AuthMidleware, this.delete)
    this.router.get('/:id/users', AuthMidleware, this.findUsers)
    this.router.post('/:id/users', AuthMidleware, this.associateUsers)
  }

  async findOne(req: Request, _: Response, next: NextFunction) {
    try {
      const input = InitInput(InputFindOneProfile, req)
      const operator = Container.get(FindOneProfileOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async findAll(req: Request, __: Response, next: NextFunction) {
    try {
      const input = InitInput(InputFindAllProfile, req)
      const operator = Container.get(FindAllProfileOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }

  }

  async create(req: Request, _: Response, next: NextFunction) {
    try {
      const input = InitInput(InputCreateProfile, req)
      const operator = Container.get(CreateProfileOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, _: Response, next: NextFunction) {
    try {
      const input = InitInput(InputDeleteProfile, req)
      const operator = Container.get(DeleteProfileOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }    
  }

  async update(req: Request, _: Response, next: NextFunction) {
    try {
      const input = InitInput(InputUpdateProfile, req)
      const operator = Container.get(UpdateProfileOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async findUsers(req: Request, _: Response, next: NextFunction) {
    try {
      const input = InitInput(FindUsersInput, req)
      const operator = Container.get(FindUsersOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async associateUsers(req: Request, _: Response, next: NextFunction) {
    try {
      const input = InitInput(AssociateUsersInput, req)
      const operator = Container.get(AssociateUsersOperator)
      const response = await operator.run(input)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  async export(req: Request, res: Response, next: NextFunction) {
    try {
      const input = InitInput(InputExportProfile, req)
      const operator = Container.get(ExportProfileOperator)
      const response = await operator.run(input)
      const { path, filename } = response.data!
      res.download(path, filename)
    } catch (error) {
      next(error)
    }
  }

}