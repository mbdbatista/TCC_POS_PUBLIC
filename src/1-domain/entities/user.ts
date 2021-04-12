import e from "express";
import { Profile } from "./profile";

export interface User {
  id: string
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  birthDate?: Date;
  createdDate: Date;
  profile?: string | Profile;
  updatedDate: Date;
}

export const UserMapper = (entity: User): User => {
  return {
    birthDate: entity.birthDate,
    createdDate: entity.createdDate,
    email: entity.email,
    firstName: entity.firstName,
    lastName: entity.lastName,
    profile: entity.profile,
    updatedDate: entity.updatedDate,
    password: entity.password,
    id: entity.id
  }
}
