import { Inject, Service } from "typedi";
import { User } from "../../../1-domain/entities/user";
import { SocialLoginEnum } from "../../../1-domain/models/socialLoginEnum";
import { SocialLoginModel } from "../../../1-domain/models/socialLoginModel";
import { Input } from "../../../3-controller/serializers/authentication/social/input";
import { Output } from "../../../3-controller/serializers/authentication/social/output";
import { FailedOauth } from "../../errors/authentication/socialLoginErrors";
import { IUserRepository, IUserRepositoryToken } from "../../repositories/iUserRepository";
import { IJwtService, IJwtServiceToken } from "../../services/iJwtService";
import { GithubLoginUseCase } from "./social/githubLoginUseCase";

@Service({ transient: true })
export class SocialLoginUseCase {

  @Inject(IJwtServiceToken)
  private readonly jwtService!: IJwtService
  @Inject(IUserRepositoryToken)
  private readonly userRepository!: IUserRepository
  @Inject()
  private readonly githubLoginUseCase!: GithubLoginUseCase

  async run(input: Input): Promise<Output> {    
    const userOauth = await this.factory(input.type, input.code)
    if (!userOauth) {
      throw FailedOauth
    }

    let user = await this.userRepository.findByEmail(userOauth.email)
    if (!user) {
      user = await this.createUser(userOauth, 'profile')
    }

    const accessToken = await this.jwtService.generateToken(userOauth.email, userOauth.firstName, user.profile as string)

    return {
      data: {
        accessToken: accessToken.token,
        expiration: accessToken.expiration
      }
    }
  }

  private async factory(type: SocialLoginEnum, code: string): Promise<SocialLoginModel | undefined> { 
    switch (type) {
      case SocialLoginEnum.github:
        return await this.githubLoginUseCase.run(code)
      default:        
        return undefined
    }
  }

  private async createUser(user: SocialLoginModel, profile: string): Promise<User> {
    return this.userRepository.create({
      birthDate: user.birthDate,
      createdDate: new Date(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profile: profile
    })
  }
}