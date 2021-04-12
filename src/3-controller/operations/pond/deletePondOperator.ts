import { Inject, Service } from "typedi"
import { DeletePondUseCase } from "../../../2-business/useCases/pond/deletePondUseCase"
import { DeletePondInput } from "../../serializers/pond/delete/deletePondInput"
import { DeletePondOutput } from "../../serializers/pond/delete/deletePondOutput"
import { BaseOperator } from "../base/baseOperator"

@Service({ transient: true })
export class DeletePondOperator extends BaseOperator<DeletePondInput, DeletePondOutput> {
  @Inject()
  private readonly useCase!: DeletePondUseCase

  async run(input: DeletePondInput): Promise<DeletePondOutput> {
    const result = await this.useCase.run(input)
    return {
      data: {
        success: result
      }
    }
  }
}