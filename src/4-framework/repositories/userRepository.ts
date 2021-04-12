import { IUserRepository, IUserRepositoryToken } from "../../2-business/repositories/iUserRepository";
import { Service } from 'typedi'
import { User } from "../../1-domain/entities/user";
import { UserModel } from '../database/models/userModel'

@Service({ id: IUserRepositoryToken, transient: false })
export class UserRepository implements IUserRepository {

  findAll(): Promise<User[]> {
    return UserModel.find().exec()
  }
  findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({email: email}).populate('profile').exec()
  }
  create(user: Partial<User>): Promise<User> {
    return UserModel.create(user)
  }
  update(id: string, user: User): Promise<User | null> {
    return UserModel.findByIdAndUpdate(id, {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      email: user.email,
      password: user.password,
      profile: user.profile,
      createdDate: user.createdDate
    }).exec()
  }
  delete(id: string): Promise<User | null> {
    return UserModel.findByIdAndDelete(id).exec()
  } 
  findByProfile(profile: string): Promise<User[]> {
    return UserModel.find({ profile: profile }).exec()
  }
  findOne(id: string): Promise<User | null> {
    return UserModel.findById(id).populate('profile').exec()
  }
}