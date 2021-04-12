import { Inject, Service } from "typedi";
import { FindUsersUseCase } from "../../../2-business/useCases/profile/findUsersUseCase";
import { FindUsersInput } from "../../serializers/profile/findUsers/findUsersInput";
import { FindUsersOutput } from "../../serializers/profile/findUsers/findUsersOutput";
import { BaseOperator } from "../base/baseOperator";

@Service()
export class FindUsersOperator extends BaseOperator<FindUsersInput, FindUsersOutput> {
  @Inject()
  private readonly findUsersUseCase!: FindUsersUseCase
  async run(input: FindUsersInput): Promise<FindUsersOutput> {
    const result = await this.findUsersUseCase.run(input)
    return {
      data: {
        total: result
      }
    }
  }
}