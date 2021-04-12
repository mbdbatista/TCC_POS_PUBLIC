import { Inject, Service } from "typedi"
import { DeleteProfileUseCase } from "../../../2-business/useCases/profile/deleteProfileUseCase"
import { InputDeleteProfile } from "../../serializers/profile/delete/inputDeleteProfile"
import { OutputDeleteProfile } from "../../serializers/profile/delete/outputDeleteProfile"
import { BaseOperator } from "../base/baseOperator"

@Service({ transient: true })
export class DeleteProfileOperator extends BaseOperator<InputDeleteProfile, OutputDeleteProfile> {
  @Inject()
  private readonly useCase!: DeleteProfileUseCase

  async run(input: InputDeleteProfile): Promise<OutputDeleteProfile> {
    const deleted = await this.useCase.run(input)
    return {
      data: {
        success: deleted
      }
    }
  }
}