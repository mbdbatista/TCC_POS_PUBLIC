import { Inject, Service } from "typedi";
import { User } from "../../../1-domain/entities/user";
import { AssociateUsersInput } from "../../../3-controller/serializers/profile/associateUsers/associateUsersInput";
import { ProfileNotFound } from "../../errors/profile/profileError";
import { IProfileRepository, IProfileRepositoryToken } from "../../repositories/iProfileRepository";
import { IUserRepository, IUserRepositoryToken } from "../../repositories/iUserRepository";

@Service({ transient: true })
export class AssociateUsersUseCase {
  @Inject(IProfileRepositoryToken)
  private readonly profileRepo!: IProfileRepository
  @Inject(IUserRepositoryToken)
  private readonly userRepo!: IUserRepository

  async run({ users, id }: AssociateUsersInput): Promise<boolean> {
    const profile = await this.profileRepo.findOne(id)
    if (!profile) {
      throw ProfileNotFound
    }

    const usersFromProfile = await this.userRepo.findByProfile(profile.id)
    const diffUsers = usersFromProfile.filter(e => !users.includes(e.id))
    await this.removeDiff(diffUsers)

    const usersPromise = users.map(async e => {
      const user = await this.userRepo.findOne(e)
      if (user) {
        await this.userRepo.update(user.id, {
          createdDate: user.createdDate,
          email: user.email,
          firstName: user.firstName,
          id: user.id,
          birthDate: user.birthDate,
          lastName: user.lastName,
          password: user.password,
          profile: profile.id
        })
      }
    })

    await Promise.all(usersPromise)

    return true
  }

  private async removeDiff(diffusers: User[]): Promise<void> {
    if (diffusers && diffusers.length === 0) {
      return
    }
    const usersPromise = diffusers.map(async user => {
      await this.userRepo.update(user.id, {
        createdDate: user.createdDate,
        email: user.email,
        firstName: user.firstName,
        id: user.id,
        birthDate: user.birthDate,
        lastName: user.lastName,
        password: user.password,
        profile: undefined
      })
    })

    await Promise.all(usersPromise)
  }
}