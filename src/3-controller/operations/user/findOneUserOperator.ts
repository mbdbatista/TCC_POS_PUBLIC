import { Inject, Service } from "typedi"
import { User } from "../../../1-domain/entities/user"
import { FindOneUserUseCase } from "../../../2-business/useCases/user/findOneUserUseCase"
import { FindOneUserInput } from "../../serializers/user/findOne/findOneUserInput"
import { FindOneUserOutput } from "../../serializers/user/findOne/findOneUserOuput"
import { BaseOperator } from "../base/baseOperator"

@Service({ transient: true })
export class FindOneUserOperator extends BaseOperator<FindOneUserInput, FindOneUserOutput> {
  @Inject()
  private readonly useCase!: FindOneUserUseCase

  public async run(input: FindOneUserInput): Promise<FindOneUserOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(user: User): FindOneUserOutput {
    const result: User = {
      birthDate: user.birthDate,
      createdDate: user.createdDate,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profile: user.profile,
      updatedDate: user.updatedDate,
      id: user.id
    }
    return {
      data: result
    }
  }
}