import { Token } from "typedi";
import { Feeding } from "../../1-domain/entities/feeding";

export const IFeedingRepositoryToken = new Token<IFeedingRepository>()
export interface IFeedingRepository {
  find(userId: string): Promise<Feeding[]>
  create(entity: Partial<Feeding>[]): Promise<Feeding[]>
  update(id: string, entity: Partial<Feeding>): Promise<Feeding | null>
}