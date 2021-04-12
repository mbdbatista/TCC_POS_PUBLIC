import { Inject, Service } from "typedi";
import { Profile } from "../../../1-domain/entities/profile";
import { InputUpdateProfile } from "../../../3-controller/serializers/profile/update/inputUpdateProfile";
import { ProfileNotFound } from "../../errors/profile/profileError";
import { IProfileRepository, IProfileRepositoryToken } from "../../repositories/iProfileRepository";

@Service({ transient: true })
export class UpdateProfileUseCase {
  @Inject(IProfileRepositoryToken)
  private readonly profileRepository!: IProfileRepository

  async run({ id, name, actions, active }: InputUpdateProfile): Promise<Profile> {
    const profile = await this.profileRepository.findOne(id)
    if (!profile)
      throw ProfileNotFound

    const result = await this.profileRepository.update(id, {
      name,
      actions,
      active
    })

    if (!result)
      throw ProfileNotFound

    return result
  }   
}