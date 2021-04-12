import { Inject, Service } from "typedi";
import { CreateProfileUseCase } from "../../../2-business/useCases/profile/createProfileUseCase";
import { InputCreateProfile } from "../../serializers/profile/create/inputCreateProfile";
import { OutputCreateProfile } from "../../serializers/profile/create/outputCreateProfile";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class CreateProfileOperator extends BaseOperator<InputCreateProfile, OutputCreateProfile> {
  @Inject()
  private readonly useCase!: CreateProfileUseCase
  async run(input: InputCreateProfile): Promise<OutputCreateProfile> {
    const result = await this.useCase.run(input)
    return {
      data: result
    }
  }
}