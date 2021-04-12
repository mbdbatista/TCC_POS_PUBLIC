import { Inject, Service } from "typedi"
import { ExportProfileUseCase } from "../../../2-business/useCases/profile/exportProfileUseCase"
import { InputExportProfile } from "../../serializers/profile/export/inputExportProfile"
import { OutputExportProfile } from "../../serializers/profile/export/outputExportProfile"
import { BaseOperator } from "../base/baseOperator"

@Service({ transient: true })
export class ExportProfileOperator extends BaseOperator<InputExportProfile, OutputExportProfile> {
  @Inject()
  private readonly useCase!: ExportProfileUseCase

  async run(input: InputExportProfile): Promise<OutputExportProfile> {
    const result = await this.useCase.run(input)
    return {
      data: result
    }
  }
}