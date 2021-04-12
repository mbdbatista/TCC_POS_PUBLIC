import { Inject, Service } from "typedi";
import { User } from "../../../1-domain/entities/user";
import { CreateUserUseCase } from "../../../2-business/useCases/user/createUserUseCase";
import { CreateUserInput } from "../../serializers/user/create/createUserInput";
import { CreateUserOutput } from "../../serializers/user/create/createUserOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class CreateUserOperator extends BaseOperator<CreateUserInput, CreateUserOutput> {
  @Inject()
  private readonly useCase!: CreateUserUseCase

  async run(input: CreateUserInput): Promise<CreateUserOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(user: User): CreateUserOutput {
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