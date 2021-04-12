import { Token } from 'typedi'
import { SocialLoginModel } from '../../1-domain/models/socialLoginModel'

export const IGithubServiceToken = new Token<IGithubService>()
export interface IGithubService { 
  getUser(token: string): Promise<SocialLoginModel>
  exchangeToken(code: string): Promise<string>
}