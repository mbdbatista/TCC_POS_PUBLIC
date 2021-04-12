import { Service } from "typedi";
import axios, { AxiosInstance } from 'axios'
import { SocialLoginModel } from "../../1-domain/models/socialLoginModel";
import { IGithubService, IGithubServiceToken } from "../../2-business/services/iGithubService";

@Service({ id: IGithubServiceToken, transient: true })
export class GithubService implements IGithubService {
  private readonly url: string
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly _axios: AxiosInstance

  constructor() {
    this.url = process.env.GITHUB_URL || ''
    this.clientId = process.env.GITHUB_CLIENT_ID || ''
    this.clientSecret = process.env.GITHUB_CLIENT_SECRET || ''
    this._axios = axios.create({
      baseURL: this.url
    })
  }

  async getUser(token: string): Promise<SocialLoginModel> {   
    const data = (await this._axios.get<User>(`/user`, 
      {        
        transformRequest: undefined,
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )).data
    const { name, email } = data
    const names = name.split(' ')
    const firstName = names.shift() ?? ''
    const lastName = names.length > 0 ? names.join(' ') : undefined

    return { 
      firstName,
      lastName,
      email
    }
  }

  async exchangeToken(code: string): Promise<string> {
    const data = (await this._axios.post<AccessTokenResponse>(`/login/oauth/access_token`,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code
      },
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    )).data

    return data.access_token
  }
}

type AccessTokenResponse = {
  access_token: string
  scope: string
  token_type: string
}

type User = {
  email: string
  name: string
}