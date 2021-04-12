import { Inject, Service } from "typedi"
import { DeleteFishSpecieUseCase } from "../../../../2-business/useCases/fish/specie/deleteFishSpecieUseCase"
import { DeleteFishSpecieInput } from "../../../serializers/fish/specie/deleteFishSpecie/deleteFishSpecieInput"
import { DeleteFishSpecieOutput } from "../../../serializers/fish/specie/deleteFishSpecie/deleteFishSpecieOutput"
import { BaseOperator } from "../../base/baseOperator"

@Service({ transient: true })
export class DeleteFishSpecieOperator extends BaseOperator<DeleteFishSpecieInput, DeleteFishSpecieOutput> {
  @Inject()
  private readonly useCase!: DeleteFishSpecieUseCase

  async run(input: DeleteFishSpecieInput): Promise<DeleteFishSpecieOutput> {
    const result = await this.useCase.run(input)
    return {
      data: {
        success: result
      }
    }
  }
}