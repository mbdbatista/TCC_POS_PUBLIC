import { Inject, Service } from "typedi";
import { GetCreatedUsersReportUseCase } from "../../../2-business/useCases/report/getCreatedUsersReportUseCase";
import { GetCreatedUsersReportInput } from "../../serializers/report/getCreatedUsersReport/getCreatedUsersReportInput";
import { GetCreatedUsersReportOutput } from "../../serializers/report/getCreatedUsersReport/getCreatedUsersReportOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class GetCreatedUsersReportOperator extends BaseOperator<GetCreatedUsersReportInput, GetCreatedUsersReportOutput>{ 
  @Inject()
  private readonly useCase!: GetCreatedUsersReportUseCase

  async run(input: GetCreatedUsersReportInput): Promise<GetCreatedUsersReportOutput> {
    return this.useCase.run(input)
  }
}