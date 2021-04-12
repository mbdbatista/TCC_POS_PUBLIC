import { Service } from 'typedi'
import { ICryptoService, ICryptoServiceToken } from "../../2-business/services/iCryptoService";
import { createHmac, } from 'crypto'

@Service({ id: ICryptoServiceToken, transient: false })
export class CryptoService implements ICryptoService {
  private readonly secret: string

  constructor() {
    this.secret = process.env.HASH || ''
  }

  hash(input: string): string {    
    return this.createHash(input)
  }

  verify(input: string, hash: string): boolean {
    const hashed = this.createHash(input)
    return hashed === hash
  } 

  private createHash(input: string): string { 
    return createHmac('SHA256', this.secret).update(input).digest('base64')
  }

}