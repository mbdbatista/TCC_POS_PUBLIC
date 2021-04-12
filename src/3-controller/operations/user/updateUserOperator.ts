import { Inject, Service } from "typedi";
import { User } from "../../../1-domain/entities/user";
import { UpdateUserUseCase } from "../../../2-business/useCases/user/updateUserUseCase";
import { UpdateUserInput } from "../../serializers/user/update/updateUserInput";
import { UpdateUserOutput } from "../../serializers/user/update/updateUserOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class UpdateUserOperator extends BaseOperator<UpdateUserInput, UpdateUserOutput>{
  @Inject()
  private readonly useCase!: UpdateUserUseCase

  async run(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const updated = await this.useCase.run(input)
    return this.mapper(updated)
  }

  private mapper(user: User): UpdateUserOutput {
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