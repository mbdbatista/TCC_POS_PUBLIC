import { Inject, Service } from "typedi";
import { FindUsersInput } from "../../../3-controller/serializers/profile/findUsers/findUsersInput";
import { ProfileNotFound } from "../../errors/profile/profileError";
import { IProfileRepository, IProfileRepositoryToken } from "../../repositories/iProfileRepository";
import { IUserRepository, IUserRepositoryToken } from "../../repositories/iUserRepository";

@Service({ transient: true })
export class FindUsersUseCase {
  @Inject(IUserRepositoryToken)
  private readonly userRepo!: IUserRepository
  @Inject(IProfileRepositoryToken)
  private readonly profileRepo!: IProfileRepository

  async run({ id }: FindUsersInput): Promise<number> {
    const profile = await this.profileRepo.findOne(id)
    if (!profile) {
      throw ProfileNotFound
    }

    const users = await this.userRepo.findByProfile(id)
    return users.length
  }
}