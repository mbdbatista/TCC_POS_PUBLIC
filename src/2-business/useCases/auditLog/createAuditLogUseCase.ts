import { Inject, Service, Token } from "typedi"
import { AuditLog, eventType } from "../../../1-domain/entities/auditLog"
import { UserModel } from "../../../3-controller/serializers/authentication/verifyToken/verifyTokenOutput"
import { EventNotFound } from "../../errors/auditLog/auditLogErrors"
import { IAuditLogRepository, IAuditLogRepositoryToken } from "../../repositories/iAuditLogRepository"

export const CreateAuditLogUseCaseToken = new Token<CreateAuditLogUseCase>()
@Service({ transient: true, id: CreateAuditLogUseCaseToken })
export class CreateAuditLogUseCase {
  @Inject(IAuditLogRepositoryToken)
  private readonly auditLogRepo!: IAuditLogRepository

  async run({ event, user }: CreateAuditLog): Promise<AuditLog> {
    if (!event) {
      throw EventNotFound
    }
    return this.auditLogRepo.create({
      event: event,
      userId: user?.id,
      createdDate: new Date()
    })
  }
}

export type CreateAuditLog = {
  event?: eventType,
  user?: UserModel
}