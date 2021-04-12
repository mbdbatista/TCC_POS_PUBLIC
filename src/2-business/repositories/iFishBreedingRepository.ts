import { Token } from "typedi";
import { FishBreeding } from "../../1-domain/entities/fish/fishBreeding";

export const IFishBreedingRepositoryToken = new Token<IFishBreedingRepository>()
export interface IFishBreedingRepository { 
  findOne(id: string): Promise<null | FishBreeding>
  create(entity: Partial<FishBreeding>): Promise<FishBreeding>
  update(id: string, entity: Partial<FishBreeding>): Promise<null | FishBreeding>
  findAll(): Promise<FishBreeding[]>
}