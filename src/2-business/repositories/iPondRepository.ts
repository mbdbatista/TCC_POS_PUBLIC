import { Token } from "typedi";
import { Pond } from "../../1-domain/entities/pond";

export const IPondRepositoryToken = new Token<IPondRepository>()
export interface IPondRepository {
  findAll(): Promise<Pond[]>
  findOne(id: string): Promise<null | Pond>
  create(entity: Partial<Pond>): Promise<Pond>
  update(id: string, entity: Partial<Pond>): Promise<null | Pond>
  delete(id: string): Promise<null | Pond>
}