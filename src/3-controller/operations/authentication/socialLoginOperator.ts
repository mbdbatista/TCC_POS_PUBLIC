import { Inject, Service } from "typedi";
import { SocialLoginUseCase } from "../../../2-business/useCases/authentication/socialLoginUseCase";
import { Input } from "../../serializers/authentication/social/input";
import { Output } from "../../serializers/authentication/social/output";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class SocialLoginOperator extends BaseOperator<Input, Output> {

  @Inject()
  private readonly useCase!: SocialLoginUseCase

  async run(input: Input): Promise<Output> {
      return await this.useCase.run(input)
  }
}