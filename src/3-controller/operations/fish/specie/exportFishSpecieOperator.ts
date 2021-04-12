import { Inject, Service } from "typedi"
import { ExportFishSpecieUseCase } from "../../../../2-business/useCases/fish/specie/exportFishSpecieUseCase"
import { ExportFishSpecieInput } from "../../../serializers/fish/specie/exportFishSpecie/exportFishSpecieInput"
import { ExportFishSpecieOutput } from "../../../serializers/fish/specie/exportFishSpecie/exportFishSpecieOutput"
import { BaseOperator } from "../../base/baseOperator"

@Service({ transient: true })
export class ExportFishSpecieOperator extends BaseOperator<ExportFishSpecieInput, ExportFishSpecieOutput> {
  @Inject()
  private readonly useCase!: ExportFishSpecieUseCase

  async run(input: ExportFishSpecieInput): Promise<ExportFishSpecieOutput> {
    const result = await this.useCase.run(input)
    return {
      data: result
    }
  }
}