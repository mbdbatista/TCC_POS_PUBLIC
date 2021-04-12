import 'reflect-metadata'
import Container from "typedi"
import { CreateUserUseCase } from "../../../../src/2-business/useCases/user/createUserUseCase"
import { IUserRepositoryToken } from "../../../../src/2-business/repositories/iUserRepository"
import { CreateUserInput } from "../../../../src/3-controller/serializers/user/create/createUserInput"
import { IProfileRepositoryToken } from '../../../../src/2-business/repositories/iProfileRepository'
import { ICryptoServiceToken } from '../../../../src/2-business/services/iCryptoService'
import { UserAlreadyRegistered } from '../../../../src/2-business/errors/user/userErrors'
import { ProfileNotFound } from '../../../../src/2-business/errors/profile/profileError'
import { mockAuditLog } from '../../../utils/mockAuditLog'


describe("2-business.useCase.user.createUserUseCase", () => {
  const currentDate = new Date()
  const input = new CreateUserInput({
    birthDate: currentDate,
    email: 'teste@teste.com',
    firstName: 'teste',
    lastName: 'teste',
    password: 'teste123'
  })
  const profile = {
    id: '12345',
    name: "visitor",
    actions: [
      {
        route: 'teste',
        access: 0
      }
    ],
    active: true
  }
  const user = {
    birthDate: currentDate,
    email: 'teste@teste.com',
    firstName: 'teste',
    lastName: 'teste',
    password: 'teste123',
    id: '123456',
    createdDate: currentDate,
    updatedDate: currentDate
  }
  beforeEach(() => {
    Container.reset()
    mockAuditLog()
    Container.set(IUserRepositoryToken, ({
      findByEmail: jest.fn().mockResolvedValue(undefined),
      create: jest.fn().mockResolvedValue(user)
    }))
    Container.set(IProfileRepositoryToken, ({
      findByName: jest.fn().mockResolvedValue(profile)
    }))
    Container.set(ICryptoServiceToken, ({
      hash: jest.fn().mockResolvedValue(input.password)
    }))
  })

  test('CreateUser::Success', async () => {
    const useCase = Container.get(CreateUserUseCase)
    const result = await useCase.run(input)
    expect(result.birthDate).toEqual(input.birthDate)
    expect(result.firstName).toEqual(input.firstName)
    expect(result.lastName).toEqual(input.lastName)
    expect(result.email).toEqual(input.email)
    expect(result.password).toEqual(input.password)
  })

  test('CreateUser:Failure::UserAlreadyRegistered', async () => {
    const userRepo = Container.get(IUserRepositoryToken)
    jest.spyOn(userRepo, 'findByEmail').mockResolvedValue(user)

    const useCase = Container.get(CreateUserUseCase)
    try {
      await useCase.run(input)
    } catch (error) {
      expect(error.code).toEqual(UserAlreadyRegistered.code)
    }
  })

  test('CreateUser:Failure::ProfileNotFound', async () => {
    const profileRepo = Container.get(IProfileRepositoryToken)
    jest.spyOn(profileRepo, 'findByName').mockResolvedValue(null)
    
    const useCase = Container.get(CreateUserUseCase)
    try {
      await useCase.run(input)
    } catch (error) {
      expect(error.code).toEqual(ProfileNotFound.code)
    }
  })
})