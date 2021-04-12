import { Inject, Service } from "typedi";
import { AssociateUsersUseCase } from "../../../2-business/useCases/profile/associateUsersUseCase";
import { AssociateUsersOutput } from "../../serializers/profile/associateUsers/associateUserOutput.ts";
import { AssociateUsersInput } from "../../serializers/profile/associateUsers/associateUsersInput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class AssociateUsersOperator extends BaseOperator<AssociateUsersInput, AssociateUsersOutput> {
  @Inject()
  private readonly useCase!: AssociateUsersUseCase
  async run(input: AssociateUsersInput): Promise<AssociateUsersOutput> {
    const result = await this.useCase.run(input)

    return {
      data: {
        success: result
      }
    }
  }

}