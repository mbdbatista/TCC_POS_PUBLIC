import { FilterQuery } from "mongoose";
import { Service } from "typedi";
import { AuditLog } from "../../1-domain/entities/auditLog";
import { AuditLogFilters, IAuditLogRepository, IAuditLogRepositoryToken } from "../../2-business/repositories/iAuditLogRepository";
import { AuditLogModel } from "../database/models/auditLogModel";

@Service({ id: IAuditLogRepositoryToken, transient: true })
export class AuditLogRepository implements IAuditLogRepository {
  findAll(filter: AuditLogFilters): Promise<AuditLog[]> {
    const dbFilter: FilterQuery<AuditLog> = {
      event: filter.event,
      createdDate: {
        $gte: filter.startDate,
        $lte: filter.endDate
      }
    }
    return AuditLogModel.find(dbFilter).exec()
  }
  findOne(id: string): Promise<AuditLog | null> {
    return AuditLogModel.findById(id).exec()
  }
  create(entity: Partial<AuditLog>): Promise<AuditLog> {
    return AuditLogModel.create(entity)
  }

}