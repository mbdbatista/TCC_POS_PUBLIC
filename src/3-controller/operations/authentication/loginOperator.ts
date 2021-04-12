import { Inject, Service } from "typedi";
import { LoginUseCase } from "../../../2-business/useCases/authentication/loginUseCase";
import { LoginInput } from "../../serializers/authentication/login/loginInput";
import { LoginOutput } from "../../serializers/authentication/login/output";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class LoginOperator extends BaseOperator<LoginInput, LoginOutput> {
  @Inject()
  private readonly useCase!: LoginUseCase

  async run(input: LoginInput): Promise<LoginOutput> {
    const result = await this.useCase.run(input)
    return { 
      data: result
    }
  }
}