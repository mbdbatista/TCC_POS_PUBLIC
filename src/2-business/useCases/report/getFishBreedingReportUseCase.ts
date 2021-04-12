import { Service } from "typedi";
import { eventType } from "../../../1-domain/entities/auditLog";
import { GetFishBreedingReportInput } from "../../../3-controller/serializers/report/getFishBreedingReport/getFishBreedingReportInput";
import { GetFishBreedingReportOutput } from "../../../3-controller/serializers/report/getFishBreedingReport/getFishBreedingReportOutput";
import { BaseReportUseCase } from "./baseReportUseCase";

@Service({ transient: true })
export class GetFishBreedingReportUseCase extends BaseReportUseCase {
  async run({ year }: GetFishBreedingReportInput): Promise<GetFishBreedingReportOutput> {
    const fishBreedingStarted = await this.getLogsFiltered(eventType.fish_breeding_started, year)
    const fishBreedingStartedReports = this.getSynthetizeReport(fishBreedingStarted, year)

    const fishBreedingFinished = await this.getLogsFiltered(eventType.fish_breeding_finished, year)
    const fishBreedingFinishedReports = this.getSynthetizeReport(fishBreedingFinished, year)

    return {
      fishBreedingStarted: fishBreedingStartedReports,
      fishBreedingFinished: fishBreedingFinishedReports
    }
  }


}
