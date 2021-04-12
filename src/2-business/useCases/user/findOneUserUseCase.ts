import { Inject, Service } from "typedi";
import { User } from "../../../1-domain/entities/user";
import { FindOneUserInput } from "../../../3-controller/serializers/user/findOne/findOneUserInput";
import { UserNotFound } from "../../errors/authentication/loginErrors";
import { IUserRepository, IUserRepositoryToken } from "../../repositories/iUserRepository";


@Service({ transient: true })
export class FindOneUserUseCase { 

  @Inject(IUserRepositoryToken)
  private readonly userRepository!: IUserRepository

  public async run({ id }: FindOneUserInput): Promise<User> {    
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw UserNotFound
    }

    return user
  }
}