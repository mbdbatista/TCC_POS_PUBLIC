import { Service } from "typedi";
import { eventType } from "../../../1-domain/entities/auditLog";
import { GetCreatedFishSpeciesReportInput } from "../../../3-controller/serializers/report/getCreatedFishSpeciesReport/getCreatedFishSpeciesReportInput";
import { GetCreatedFishSpeciesReportOutput } from "../../../3-controller/serializers/report/getCreatedFishSpeciesReport/getCreatedFishSpeciesReportOutput";
import { BaseReportUseCase } from "./baseReportUseCase";

@Service({ transient: true })
export class GetCreatedFishSpeciesReportUseCase extends BaseReportUseCase {
  async run({ year }: GetCreatedFishSpeciesReportInput): Promise<GetCreatedFishSpeciesReportOutput> {
    const logs = await this.getLogsFiltered(eventType.fish_specie_created, year)
    const reports = this.getSynthetizeReport(logs, year)

    return {
      data: reports
    }
  }


}
