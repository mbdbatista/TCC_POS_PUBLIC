import { Service } from "typedi";
import { sign, decode } from 'jsonwebtoken';
import { AccessTokenModel } from "../../1-domain/models/accessTokenModel";
import { IJwtService, IJwtServiceToken, UserDecoded } from "../../2-business/services/iJwtService";

@Service({ id: IJwtServiceToken, transient: true })
export class JwtService implements IJwtService {
  private readonly secretKey: string

  constructor() { 
    this.secretKey = process.env.JWT_SECRET || ''
  }

  async generateToken(id: string, name: string, profile: string): Promise<AccessTokenModel> {
    const secondsToExpire = 14400
    const token = sign({ id: id, name, profile }, this.secretKey, {
      expiresIn: secondsToExpire
    })

    const expiration = new Date()
    expiration.setHours(expiration.getHours() + (secondsToExpire / 60 / 60))

    return {
      token,
      expiration
    }
  }

  async decodeToken(token: string): Promise<UserDecoded> {
    const result = decode(token) as { [key: string]: any; }
    const expireDate = new Date(result.exp * 1000)
    return { 
      id: result.id,
      name: result.name,
      profile: result.profile,
      expired: expireDate < new Date()
    }
  }
}