import { Inject, Service } from "typedi";
import { VerifyTokenInput } from "../../../3-controller/serializers/authentication/verifyToken/verifyTokenInput";
import { VerifyTokenOutput } from "../../../3-controller/serializers/authentication/verifyToken/verifyTokenOutput";
import { UserNotFound } from "../../errors/authentication/loginErrors";
import { ExpiredToken } from "../../errors/authentication/verifyTokenErrors";
import { ProfileNotFound } from "../../errors/profile/profileError";
import { IProfileRepository, IProfileRepositoryToken } from "../../repositories/iProfileRepository";
import { IUserRepository, IUserRepositoryToken } from "../../repositories/iUserRepository";
import { IJwtService, IJwtServiceToken } from "../../services/iJwtService";

@Service({ transient: true })
export class VerifyTokenUseCase { 
  @Inject(IJwtServiceToken)
  private readonly jwtService!: IJwtService
  @Inject(IUserRepositoryToken)
  private readonly userRepo!: IUserRepository
  @Inject(IProfileRepositoryToken)
  private readonly profileRepo!: IProfileRepository


  async run({ token }: VerifyTokenInput): Promise<VerifyTokenOutput> {
    const decoded = await this.jwtService.decodeToken(token)

    if (decoded.expired) {
      throw ExpiredToken
    }
    const user = await this.userRepo.findOne(decoded.id)
    if (!user) {
      throw UserNotFound
    }
    if (typeof(user.profile) === 'string') {
      throw ProfileNotFound
    }

    const isAdmin = user.profile?.actions.length === 0

    return {
      data: {
        email: user.email,
        name: user.firstName,
        profile: user.profile,
        isAdmin,
        id: user.id
      }
    }
  }
}