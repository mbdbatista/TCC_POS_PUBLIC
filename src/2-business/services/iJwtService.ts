import { Token } from 'typedi'
import { AccessTokenModel } from '../../1-domain/models/accessTokenModel'

export const IJwtServiceToken = new Token<IJwtService>()
export interface IJwtService { 
  generateToken(id: string, name: string, profile: string): Promise<AccessTokenModel>
  decodeToken(token: string): Promise<UserDecoded>
}

export type UserDecoded = {
  id: string,
  name: string,
  profile: string,
  expired: boolean
}