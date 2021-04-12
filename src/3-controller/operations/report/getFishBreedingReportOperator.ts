import { Inject, Service } from "typedi";
import { GetFishBreedingReportUseCase } from "../../../2-business/useCases/report/getFishBreedingReportUseCase";
import { GetFishBreedingReportInput } from "../../serializers/report/getFishBreedingReport/getFishBreedingReportInput";
import { GetFishBreedingReportOutput } from "../../serializers/report/getFishBreedingReport/getFishBreedingReportOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class GetFishBreedingReportOperator extends BaseOperator<GetFishBreedingReportInput, GetFishBreedingReportOutput>{
  @Inject()
  private readonly useCase!: GetFishBreedingReportUseCase

  async run(input: GetFishBreedingReportInput): Promise<GetFishBreedingReportOutput> {
    return this.useCase.run(input)
  }
}