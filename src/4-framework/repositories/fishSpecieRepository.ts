import { Service } from "typedi";
import { FishSpecie } from "../../1-domain/entities/fish/fishSpecies";
import { IFishSpecieRepository, IFishSpecieRepositoryToken } from "../../2-business/repositories/iFishSpecieRepository";
import { FishSpecieModel } from "../database/models/fishSpecieModel";

@Service({ id: IFishSpecieRepositoryToken, transient: true })
export class FishSpecieRepository implements IFishSpecieRepository {
  findAll(): Promise<FishSpecie[]> {
    return FishSpecieModel.find().exec()
  }
  findOne(id: string): Promise<FishSpecie | null> {
    return FishSpecieModel.findById(id).exec()
  }
  findByName(name: string): Promise<FishSpecie | null> {
    return FishSpecieModel.findOne({ name }).exec()
  }
  create(entity: Partial<FishSpecie>): Promise<FishSpecie> {
    return FishSpecieModel.create(entity)
  }
  update(id: string, entity: Partial<FishSpecie>): Promise<FishSpecie | null> {
    return FishSpecieModel.findByIdAndUpdate(id, {
      name: entity.name,
      carnivore: entity.carnivore,
      sizes: entity.sizes
    }).exec()
  }
  delete(id: string): Promise<FishSpecie | null> {
    return FishSpecieModel.findByIdAndDelete(id).exec()
  }

}