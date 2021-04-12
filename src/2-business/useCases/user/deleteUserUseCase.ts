import { Inject, Service } from "typedi";
import { DeleteUserInput } from "../../../3-controller/serializers/user/delete/deleteUserInput";
import { UserNotFound } from "../../errors/authentication/loginErrors";
import { IUserRepository, IUserRepositoryToken } from "../../repositories/iUserRepository";

@Service({ transient: true })
export class DeleteUserUseCase {
  @Inject(IUserRepositoryToken)
  private readonly userRepo!: IUserRepository

  async run({ id }: DeleteUserInput): Promise<boolean> { 
    const user = await this.userRepo.findOne(id)
    if (!user) {
      throw UserNotFound
    }

    await this.userRepo.delete(id)
    return true
  }
}