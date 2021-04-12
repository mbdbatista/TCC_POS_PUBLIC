import { Inject, Service } from "typedi";
import { eventType } from "../../../1-domain/entities/auditLog";
import { GetCreatedUsersReportInput } from "../../../3-controller/serializers/report/getCreatedUsersReport/getCreatedUsersReportInput";
import { GetCreatedUsersReportOutput } from "../../../3-controller/serializers/report/getCreatedUsersReport/getCreatedUsersReportOutput";
import { BaseReportUseCase } from "./baseReportUseCase";
@Service({ transient: true })
export class GetCreatedUsersReportUseCase extends BaseReportUseCase {

  async run({ year }: GetCreatedUsersReportInput): Promise<GetCreatedUsersReportOutput> {
    const logs = await this.getLogsFiltered(eventType.user_created, year)
    const reports = this.getSynthetizeReport(logs, year)

    return {
      data: reports
    }
  }
}