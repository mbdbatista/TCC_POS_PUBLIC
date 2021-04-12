import 'reflect-metadata'
import Container from "typedi"
import { AuditLog, eventType } from "../../../../src/1-domain/entities/auditLog"
import { EventNotFound } from '../../../../src/2-business/errors/auditLog/auditLogErrors'
import { IAuditLogRepositoryToken } from "../../../../src/2-business/repositories/iAuditLogRepository"
import { CreateAuditLogUseCaseToken } from '../../../../src/2-business/useCases/auditLog/createAuditLogUseCase'

describe("2-business.useCase.auditLog.createAuditLogUseCase", () => {
  const currentDate = new Date()
  const auditLogInput = {
    event: eventType.fish_specie_created,
    user: {
      id: 'string',
      email: 'string',
      name: 'string',
      profile: undefined,
      isAdmin: false
    }
  }
  const auditLog: AuditLog = {
    createdDate: currentDate,
    event: eventType.fish_specie_created,
    id: '1',
    userId: '1234'
  }

  beforeEach(() => {
    Container.set(IAuditLogRepositoryToken, ({
      create: jest.fn().mockResolvedValue(auditLog),
      findOne: jest.fn().mockResolvedValue(auditLog),
      findAll: jest.fn().mockResolvedValue([auditLog])
    }))
  })

  test('Success: Create Audit Log', async () => {
    const useCase = Container.get(CreateAuditLogUseCaseToken)
    const result = await useCase.run(auditLogInput)
    expect(result.event).toBe(auditLog.event)
    expect(result.createdDate).toBe(auditLog.createdDate)
    expect(result.userId).toBe(auditLog.userId)
    expect(result.id).toBe(auditLog.id)
  })

  test('Error: EventNotFound', async () => {
    const useCase = Container.get(CreateAuditLogUseCaseToken)
    const input = {
      ...auditLogInput,
      event: undefined
    }
    try {
      await useCase.run(input)
    } catch (error) {
      expect(error.code).toBe(EventNotFound.code)
    }
  })

})