import { Service } from "typedi";
import { eventType } from "../../../1-domain/entities/auditLog";
import { GetCreatedPondsReportInput } from "../../../3-controller/serializers/report/getCreatedPondsReport/getCreatedPondsReportInput";
import { GetCreatedPondsReportOutput } from "../../../3-controller/serializers/report/getCreatedPondsReport/getCreatedPondsReportOutput";
import { BaseReportUseCase } from "./baseReportUseCase";

@Service({ transient: true })
export class GetCreatedPondsReportUseCase extends BaseReportUseCase {
  async run({ year }: GetCreatedPondsReportInput): Promise<GetCreatedPondsReportOutput> {
    const logs = await this.getLogsFiltered(eventType.pond_created, year)
    const reports = this.getSynthetizeReport(logs, year)

    return {
      data: reports
    }
  }


}
