import { BaseOutput } from "../../base/baseOutput";
type SocialLoginModel = { 
  accessToken: string,
  expiration: Date
}

export class Output extends BaseOutput<SocialLoginModel | null> { }