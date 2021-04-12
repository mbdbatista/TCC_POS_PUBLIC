import { Inject, Service } from "typedi";
import { Profile } from "../../../1-domain/entities/profile";
import { User } from "../../../1-domain/entities/user";
import { UpdateUserInput } from "../../../3-controller/serializers/user/update/updateUserInput";
import { UserNotFound } from "../../errors/authentication/loginErrors";
import { IUserRepository, IUserRepositoryToken } from "../../repositories/iUserRepository";

@Service({ transient: true })
export class UpdateUserUseCase {
  @Inject(IUserRepositoryToken)
  private readonly userRepo!: IUserRepository

  async run({ id, firstName, lastName, email, password, birthDate }: UpdateUserInput): Promise<User> {
    const user = await this.userRepo.findOne(id)
    if (!user) {
      throw UserNotFound
    }
    const profile = (user.profile || {}) as Profile
    const newUser = await this.userRepo.update(id, {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      birthDate: birthDate || user.birthDate,
      createdDate: user.createdDate,
      email: email || user.email,
      profile: profile.id,
      password: password || user.password,
      updatedDate: new Date()
    })

    if (!newUser) {
      throw UserNotFound
    }

    return newUser
  }
}