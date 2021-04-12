import { Profile } from "../../../../1-domain/entities/profile";
import { BaseOutput } from "../../base/baseOutput";

export type UserModel = {
  id: string,
  email: string,
  name: string,
  profile: Profile | undefined,
  isAdmin: boolean
}

export interface VerifyTokenOutput extends BaseOutput<UserModel> { }