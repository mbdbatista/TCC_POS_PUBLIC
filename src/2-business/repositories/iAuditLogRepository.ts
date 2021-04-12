import { Token } from "typedi";
import { AuditLog, eventType } from "../../1-domain/entities/auditLog";

export const IAuditLogRepositoryToken = new Token<IAuditLogRepository>()
export interface IAuditLogRepository {
  findAll(filter: AuditLogFilters): Promise<AuditLog[]>
  findOne(id: string): Promise<null | AuditLog>
  create(entity: Partial<AuditLog>): Promise<AuditLog>
}

export interface AuditLogFilters {
  event?: eventType
  startDate?: Date
  endDate?: Date
}