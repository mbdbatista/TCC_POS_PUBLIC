import { Token } from "typedi";
import { FishSpecie } from "../../1-domain/entities/fish/fishSpecies";

export const IFishSpecieRepositoryToken = new Token<IFishSpecieRepository>()
export interface IFishSpecieRepository {
  findAll(): Promise<FishSpecie[]>
  findOne(id: string): Promise<null | FishSpecie>
  findByName(name: string): Promise<null | FishSpecie>
  create(entity: Partial<FishSpecie>): Promise<FishSpecie>
  update(id: string, entity: Partial<FishSpecie>): Promise<null | FishSpecie>
  delete(id: string): Promise<null | FishSpecie>
}