import Container from "typedi"
import { AuditLog, eventType } from "../../src/1-domain/entities/auditLog"
import { IAuditLogRepositoryToken } from "../../src/2-business/repositories/iAuditLogRepository"
import { CreateAuditLogUseCaseToken } from "../../src/2-business/useCases/auditLog/createAuditLogUseCase"

export const mockAuditLog = () => {
  const auditLog: AuditLog = {
    createdDate: new Date(),
    event: eventType.fish_specie_created,
    id: '1',
    userId: '1234'
  }

  Container.set(IAuditLogRepositoryToken, ({
    create: jest.fn().mockResolvedValue(auditLog),
    findOne: jest.fn().mockResolvedValue(auditLog),
    findAll: jest.fn().mockResolvedValue([auditLog])
  }))

  Container.set(CreateAuditLogUseCaseToken, ({
    run: jest.fn().mockResolvedValue(auditLog)
  }))
}