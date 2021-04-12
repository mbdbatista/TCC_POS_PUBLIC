import { Inject, Service } from "typedi";
import { VerifyTokenUseCase } from "../../../2-business/useCases/authentication/verifyTokenUseCase";
import { VerifyTokenInput } from "../../serializers/authentication/verifyToken/verifyTokenInput";
import { VerifyTokenOutput } from "../../serializers/authentication/verifyToken/verifyTokenOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class VerifyTokenOperator extends BaseOperator<VerifyTokenInput, VerifyTokenOutput> {
  @Inject()
  private readonly verifyTokenUseCase!: VerifyTokenUseCase

  async run(input: VerifyTokenInput): Promise<VerifyTokenOutput> {
    return this.verifyTokenUseCase.run(input)
  }
}