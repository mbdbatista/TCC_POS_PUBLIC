import { Inject, Service } from "typedi"
import { InputCreateProfile } from "../../../3-controller/serializers/profile/create/inputCreateProfile"
import { IProfileRepository, IProfileRepositoryToken } from "../../repositories/iProfileRepository"
import { ProfileValidatedError } from "../../errors/profile/profileError"
import { Profile } from "../../../1-domain/entities/profile"

@Service({ transient: true })
export class CreateProfileUseCase {
  @Inject(IProfileRepositoryToken)
  private readonly profileRepository!: IProfileRepository

  async run({ name, actions }: InputCreateProfile): Promise<Profile> {
    if (!(name && actions))
      throw ProfileValidatedError

    return this.profileRepository.create({
      active: true,
      name,
      actions
    })
  }
}