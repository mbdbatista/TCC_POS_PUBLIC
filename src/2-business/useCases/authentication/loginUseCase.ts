import { Inject, Service } from "typedi";
import { UserMapper } from "../../../1-domain/entities/user";
import { LoginInput } from "../../../3-controller/serializers/authentication/login/loginInput";
import { LoginModel } from "../../../3-controller/serializers/authentication/login/output";
import { UserNotFound, PasswordDoenstMatch } from "../../errors/authentication/loginErrors";
import { IUserRepository, IUserRepositoryToken } from "../../repositories/iUserRepository";
import { ICryptoService, ICryptoServiceToken } from "../../services/iCryptoService";
import { IJwtService, IJwtServiceToken } from "../../services/iJwtService";

@Service({ transient: true })
export class LoginUseCase {
  @Inject(IUserRepositoryToken)
  private readonly userRepository!: IUserRepository
  @Inject(ICryptoServiceToken)
  private readonly cryptoService!: ICryptoService
  @Inject(IJwtServiceToken)
  private readonly jwtService!: IJwtService

  async run(input: LoginInput): Promise<LoginModel> {
    const dbUser = await this.userRepository.findByEmail(input.username)
    if (!dbUser) {
      throw UserNotFound
    }

    const user = UserMapper(dbUser)

    const passwordMatches = this.cryptoService.verify(input.password, user.password ?? '')
    if (!passwordMatches) {
      throw PasswordDoenstMatch
    }

    const accessToken = await this.jwtService.generateToken(user.id, user.firstName, user.profile as string)

    await this.userRepository.update(user.id, {
      ...user,
      updatedDate: new Date()
    })

    return {
      accessToken: accessToken.token,
      expiration: accessToken.expiration
    }
  }
}