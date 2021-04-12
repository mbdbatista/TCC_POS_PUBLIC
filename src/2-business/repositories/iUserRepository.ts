import { Token } from 'typedi'
import { User } from '../../1-domain/entities/user'

export const IUserRepositoryToken = new Token<IUserRepository>()
export interface IUserRepository { 
  findAll(): Promise<User[]>  
  findByEmail(email: string): Promise<User | null>
  create(user: Partial<User>): Promise<User>
  update(id: string, user: Partial<User>): Promise<User | null>
  delete(id: string): Promise<User | null>
  findByProfile(profile: string): Promise<User[]>
  findOne(id: string): Promise<User | null>
}