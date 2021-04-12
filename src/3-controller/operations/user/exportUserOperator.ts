import { Inject, Service } from "typedi"
import { ExportUserUseCase } from "../../../2-business/useCases/user/exportUserUseCase"
import { ExportUserInput } from "../../serializers/user/export/exportUserInput"
import { ExportUserOutput } from "../../serializers/user/export/exportUserOutput"
import { BaseOperator } from "../base/baseOperator"

@Service({ transient: true })
export class ExportUserOperator extends BaseOperator<ExportUserInput, ExportUserOutput> {
  @Inject()
  private readonly useCase!: ExportUserUseCase

  async run(input: ExportUserInput): Promise<ExportUserOutput> {
    const deleted = await this.useCase.run(input)
    return {
      data: deleted
    }
  }
}