import { Inject, Service } from "typedi"
import { DeleteUserUseCase } from "../../../2-business/useCases/user/deleteUserUseCase"
import { DeleteUserInput } from "../../serializers/user/delete/deleteUserInput"
import { DeleteUserOutput } from "../../serializers/user/delete/deleteUserOutput"
import { BaseOperator } from "../base/baseOperator"

@Service({ transient: true })
export class DeleteUserOperator extends BaseOperator<DeleteUserInput, DeleteUserOutput> {
  @Inject()
  private readonly useCase!: DeleteUserUseCase

  async run(input: DeleteUserInput): Promise<DeleteUserOutput> {
    const deleted = await this.useCase.run(input)
    return {
      data: {
        success: deleted
      }
    }
  }
}