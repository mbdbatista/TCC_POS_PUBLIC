import { Inject } from "typedi";
import { AuditLog, eventType } from "../../../1-domain/entities/auditLog";
import { ReportModel } from "../../../3-controller/serializers/base/reports/baseReportOutput";
import { AuditLogFilters, IAuditLogRepository, IAuditLogRepositoryToken } from "../../repositories/iAuditLogRepository";

export class BaseReportUseCase {
  @Inject(IAuditLogRepositoryToken)
  private readonly auditLogRepository!: IAuditLogRepository

  protected getLogsFiltered(event: eventType, year?: number): Promise<AuditLog[]> {
    const currentYear = year || new Date().getFullYear()
    const filter: AuditLogFilters = {
      event: event,
      startDate: new Date(currentYear, 0, 1),
      endDate: new Date(currentYear, 11, 31)
    }

    return this.auditLogRepository.findAll(filter)
  }

  private getDistinctMonths(logs: AuditLog[]): number[] {
    return logs.map(e => e.createdDate.getMonth()).filter((value, index, self) => self.indexOf(value) === index)
  }

  protected getSynthetizeReport(logs: AuditLog[], year?: number): ReportModel[] {
    const currentYear = year || new Date().getFullYear()
    const distinct = this.getDistinctMonths(logs)
    const months = this.getAllMonths()
    return months.map(ele => {
      const month = distinct.find(e => e === ele.index)
      let value = 0
      if (month) {
        const startDate = new Date(currentYear, month, 1)
        const endDate = new Date(currentYear, month + 1, 0)
        const logsFromMonth = logs.filter(e => e.createdDate >= startDate && e.createdDate <= endDate)
        value = logsFromMonth.length
      }

      return {
        title: ele.title,
        value: value
      }
    })
  }


  private getAllMonths(): { index: number, title: string }[] {
    return [
      {
        index: 0,
        title: 'Janeiro',
      },
      {
        index: 1,
        title: 'Fevereiro',
      },
      {
        index: 2,
        title: 'Março',
      },
      {
        index: 3,
        title: 'Abril',
      },
      {
        index: 4,
        title: 'Maio',
      },
      {
        index: 5,
        title: 'Junho',
      },
      {
        index: 6,
        title: 'Julho',
      },
      {
        index: 7,
        title: 'Agosto',
      },
      {
        index: 8,
        title: 'Setembro',
      },
      {
        index: 9,
        title: 'Outubro',
      },
      {
        index: 10,
        title: 'Novembro',
      },
      {
        index: 11,
        title: 'Dezembro',
      }
    ]
  }
}