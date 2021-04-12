import { Inject, Service } from 'typedi'
import { Profile } from '../../../1-domain/entities/profile'
import { InputFindOneProfile } from '../../../3-controller/serializers/profile/findOne/inputFindOneProfile'
import { ProfileNotFound } from '../../errors/profile/profileError'
import { IProfileRepository, IProfileRepositoryToken } from '../../repositories/iProfileRepository'

@Service({ transient: true })
export class FindOneProfileUseCase {
  @Inject(IProfileRepositoryToken)
  private readonly profileRepository!: IProfileRepository

  async run({ id }: InputFindOneProfile): Promise<Profile> {
    const profile = await this.profileRepository.findOne(id)
    if (!profile)
      throw ProfileNotFound

    return profile
  }
}