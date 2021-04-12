import { Inject, Service } from "typedi";
import { GetCreatedFishSpeciesReportUseCase } from "../../../2-business/useCases/report/getCreatedFishSpeciesReportUseCase";
import { GetCreatedFishSpeciesReportInput } from "../../serializers/report/getCreatedFishSpeciesReport/getCreatedFishSpeciesReportInput";
import { GetCreatedFishSpeciesReportOutput } from "../../serializers/report/getCreatedFishSpeciesReport/getCreatedFishSpeciesReportOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class GetCreatedFishSpeciesReportOperator extends BaseOperator<GetCreatedFishSpeciesReportInput, GetCreatedFishSpeciesReportOutput>{
  @Inject()
  private readonly useCase!: GetCreatedFishSpeciesReportUseCase

  async run(input: GetCreatedFishSpeciesReportInput): Promise<GetCreatedFishSpeciesReportOutput> {
    return this.useCase.run(input)
  }
}