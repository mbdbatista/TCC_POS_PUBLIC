import { Inject, Service } from "typedi";
import { InputDeleteProfile } from "../../../3-controller/serializers/profile/delete/inputDeleteProfile";
import { ProfileNotFound } from "../../errors/profile/profileError";
import { IProfileRepository, IProfileRepositoryToken } from "../../repositories/iProfileRepository"

@Service({ transient: true })
export class DeleteProfileUseCase {
  @Inject(IProfileRepositoryToken)
  private readonly profileRepository!: IProfileRepository

  async run({ id }: InputDeleteProfile): Promise<boolean> {
    const profile = await this.profileRepository.findOne(id)
    if (!profile)
      throw ProfileNotFound

    const result = await this.profileRepository.delete(id)    
    return true
  }
}