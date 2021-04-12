import { Inject, Service } from "typedi";
import { GetCreatedPondsReportUseCase } from "../../../2-business/useCases/report/getCreatedPondsReportUseCase";
import { GetCreatedPondsReportInput } from "../../serializers/report/getCreatedPondsReport/getCreatedPondsReportInput";
import { GetCreatedPondsReportOutput } from "../../serializers/report/getCreatedPondsReport/getCreatedPondsReportOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class GetCreatedPondsReportOperator extends BaseOperator<GetCreatedPondsReportInput, GetCreatedPondsReportOutput>{ 
  @Inject()
  private readonly useCase!: GetCreatedPondsReportUseCase

  async run(input: GetCreatedPondsReportInput): Promise<GetCreatedPondsReportOutput> {
    return this.useCase.run(input)
  }
}