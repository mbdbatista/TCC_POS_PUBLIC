import { Service } from 'typedi'
import { Profile } from '../../1-domain/entities/profile'
import { IProfileRepository, IProfileRepositoryToken } from '../../2-business/repositories/iProfileRepository'
import { ProfileModel } from '../database/models/profileModel';

@Service({ id: IProfileRepositoryToken, transient: true })
export class ProfileRepository implements IProfileRepository {
  findOne(id: string): Promise<Profile | null> {
    return ProfileModel.findById(id).exec()
  }
  findAll(): Promise<Profile[]> {    
    return ProfileModel.find().exec()
  }
  create(entity: Profile): Promise<Profile> {
    return ProfileModel.create(entity)
  }
  async update(id: string, entity: Partial<Profile>): Promise<Profile | null> {
    return await ProfileModel.findByIdAndUpdate(id, {
      name: entity.name,
      actions: entity.actions
    })
  }
  async delete(id: string): Promise<Profile | null> {
    return ProfileModel.findByIdAndDelete(id).exec()
  }
  findByName(name: string): Promise<Profile | null> {
    return ProfileModel.findOne({ name: name }).exec()
  }
}