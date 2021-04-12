import { Inject, Service } from "typedi";
import { User } from "../../../1-domain/entities/user";
import { FindAllUserInput } from "../../../3-controller/serializers/user/findAll/findAllUserInput";
import { IUserRepository, IUserRepositoryToken } from "../../repositories/iUserRepository";

@Service({ transient: true })
export class FindAllUserUseCase {
  @Inject(IUserRepositoryToken)
  private readonly userRepo!: IUserRepository

  async run({ profile, email, name }: FindAllUserInput): Promise<User[]> {
    let users = await this.userRepo.findAll()

    if (profile) {
      users = users.filter(e => e.profile === profile)
    }

    if (email) {
      users = users.filter(e => e.email?.includes(email))
    }

    if (name) {
      users = users.filter(e => `${e.firstName} ${e.lastName}`.includes(name))
    }

    return users
  }
}