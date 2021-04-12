import { Token } from 'typedi'
export const ICryptoServiceToken = new Token<ICryptoService>()
export interface ICryptoService { 
  hash(input: string): string
  verify(input: string, hash: string): boolean
}