import { Inject, Service } from "typedi"
import { ExportPondUseCase } from "../../../2-business/useCases/pond/exportPondUseCase"
import { ExportPondInput } from "../../serializers/pond/export/exportPondInput"
import { ExportPondOutput } from "../../serializers/pond/export/exportPondOutput"
import { BaseOperator } from "../base/baseOperator"

@Service({ transient: true })
export class ExportPondOperator extends BaseOperator<ExportPondInput, ExportPondOutput> {
  @Inject()
  private readonly useCase!: ExportPondUseCase

  async run(input: ExportPondInput): Promise<ExportPondOutput> {
    const result = await this.useCase.run(input)
    return {
      data: result
    }
  }
}