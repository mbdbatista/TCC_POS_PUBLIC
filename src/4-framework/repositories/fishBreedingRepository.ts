import { Service } from "typedi";
import { FishBreeding } from "../../1-domain/entities/fish/fishBreeding";
import { IFishBreedingRepository, IFishBreedingRepositoryToken } from "../../2-business/repositories/iFishBreedingRepository";
import { FishBreedingModel } from "../database/models/fihsBreedingModel";

@Service({ id: IFishBreedingRepositoryToken, transient: true })
export class FishBreedingRepository implements IFishBreedingRepository {
  findOne(id: string): Promise<FishBreeding | null> {
    return FishBreedingModel.findById(id).populate('fishSpecie').populate('pond').exec()
  }
  create(entity: Partial<FishBreeding>): Promise<FishBreeding> {
    return FishBreedingModel.create(entity)
  }
  update(id: string, entity: Partial<FishBreeding>): Promise<FishBreeding | null> {
    return FishBreedingModel.findByIdAndUpdate(id, entity).populate('fishSpecie').populate('pond').exec()
  }
  findAll(): Promise<FishBreeding[]> {
    return FishBreedingModel.find().populate('fishSpecie').populate('pond').exec()
  }

}