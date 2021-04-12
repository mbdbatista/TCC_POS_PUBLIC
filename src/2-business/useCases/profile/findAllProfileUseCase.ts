import { Inject, Service } from "typedi";
import { Profile } from "../../../1-domain/entities/profile";
import { InputFindAllProfile } from "../../../3-controller/serializers/profile/findAll/inputFindAllProfile";
import { IProfileRepository, IProfileRepositoryToken } from "../../repositories/iProfileRepository";

@Service({ transient: true })
export class FindAllProfileUseCase {
  @Inject(IProfileRepositoryToken)
  private readonly profileRepository!: IProfileRepository

  async run({ name }: InputFindAllProfile): Promise<Profile[]> {
    let data = await this.profileRepository.findAll()
    if (name) {
      data = data.filter(profile => profile.name.includes(name))
    }

    return data
  }
}