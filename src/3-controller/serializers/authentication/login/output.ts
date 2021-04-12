import { BaseOutput } from "../../base/baseOutput";

export type LoginModel = { 
  accessToken: string
  expiration: Date
}
export class LoginOutput extends BaseOutput<LoginModel | null> { }