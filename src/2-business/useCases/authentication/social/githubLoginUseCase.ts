import { Inject, Service } from "typedi"
import { SocialLoginModel } from "../../../../1-domain/models/socialLoginModel"
import { FailedOauth } from "../../../errors/authentication/socialLoginErrors"
import { IGithubService, IGithubServiceToken } from "../../../services/iGithubService"

@Service({ transient: true })
export class GithubLoginUseCase {

  @Inject(IGithubServiceToken)
  private readonly githubService!: IGithubService

  async run(code: string): Promise<SocialLoginModel> {
    const token = await this.githubService.exchangeToken(code)
    if (!token) { 
      throw FailedOauth
    }
    return await this.githubService.getUser(token)
  }
}