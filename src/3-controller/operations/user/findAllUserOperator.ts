import { Inject, Service } from "typedi";
import { User } from "../../../1-domain/entities/user";
import { FindAllUserUseCase } from "../../../2-business/useCases/user/findAllUserUseCase";
import { FindAllUserInput } from "../../serializers/user/findAll/findAllUserInput";
import { FindAllUserOutput } from "../../serializers/user/findAll/findAllUserOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class FindAllUserOperator extends BaseOperator<FindAllUserInput, FindAllUserOutput> {
  @Inject()
  private readonly useCase!: FindAllUserUseCase

  async run(input: FindAllUserInput): Promise<FindAllUserOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }


  private mapper(users: User[]): FindAllUserOutput {
    const result = users.map(e => {
      return {
        birthDate: e.birthDate,
        createdDate: e.createdDate,
        email: e.email,
        firstName: e.firstName,
        lastName: e.lastName,
        profile: e.profile,
        updatedDate: e.updatedDate,
        id: e.id
      }
    })
    return {
      data: result
    }
  }
}