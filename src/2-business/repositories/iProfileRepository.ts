import { Token } from 'typedi'
import { Profile } from '../../1-domain/entities/profile'

export const IProfileRepositoryToken = new Token<IProfileRepository>()
export interface IProfileRepository {
  findOne(id: string): Promise<Profile | null>
  findAll(): Promise<Profile[]>
  findByName(name: string): Promise<Profile | null>
  create(entity: Partial<Profile>): Promise<Profile>
  update(id: string, entity: Partial<Profile>): Promise<Profile | null>
  delete(id: string): Promise<Profile | null>
}
