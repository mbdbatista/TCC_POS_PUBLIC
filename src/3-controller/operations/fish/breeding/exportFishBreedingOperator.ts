import { Inject, Service } from "typedi"
import { ExportFishBreedingUseCase } from "../../../../2-business/useCases/fish/breeding/exportFishBreedingUseCase"
import { ExportFishBreedingInput } from "../../../serializers/fish/breeding/export/exportFishBreedingInput"
import { ExportFishBreedingOutput } from "../../../serializers/fish/breeding/export/exportFishBreedingOutput"
import { BaseOperator } from "../../base/baseOperator"

@Service({ transient: true })
export class ExportFishBreedingOperator extends BaseOperator<ExportFishBreedingInput, ExportFishBreedingOutput> {
  @Inject()
  private readonly useCase!: ExportFishBreedingUseCase

  async run(input: ExportFishBreedingInput): Promise<ExportFishBreedingOutput> {
    const result = await this.useCase.run(input)
    return {
      data: result
    }
  }
}