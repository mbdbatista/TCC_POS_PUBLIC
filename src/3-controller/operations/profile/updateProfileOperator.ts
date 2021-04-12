import { Inject, Service } from "typedi";
import { UpdateProfileUseCase } from "../../../2-business/useCases/profile/updateProfileUseCase";
import { OutputCreateProfile } from "../../serializers/profile/create/outputCreateProfile";
import { InputUpdateProfile } from "../../serializers/profile/update/inputUpdateProfile";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class UpdateProfileOperator extends BaseOperator<InputUpdateProfile, OutputCreateProfile>{
  @Inject()
  private readonly useCase!: UpdateProfileUseCase

  async run(input: InputUpdateProfile): Promise<OutputCreateProfile> {
    const updated = await this.useCase.run(input)
    return {
      data: updated
    }
  }
}