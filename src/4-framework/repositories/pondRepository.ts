import { Service } from "typedi";
import { Pond } from "../../1-domain/entities/pond";
import { IPondRepository, IPondRepositoryToken } from "../../2-business/repositories/iPondRepository";
import { PondModel } from "../database/models/pondModel";

@Service({ id: IPondRepositoryToken, transient: true })
export class PondRepository implements IPondRepository {
  findAll(): Promise<Pond[]> {
    return PondModel.find().exec()
  }
  findOne(id: string): Promise<Pond | null> {
    return PondModel.findById(id).exec()
  }
  create(entity: Partial<Pond>): Promise<Pond> {
    return PondModel.create(entity)
  }
  update(id: string, entity: Partial<Pond>): Promise<Pond | null> {
    return PondModel.findByIdAndUpdate(id, {
      name: entity.name,
      width: entity.width,
      height: entity.height,
      length: entity.length,
      meters: entity.meters,
      userId: entity.userId
    }).exec()
  }
  delete(id: string): Promise<Pond | null> {
    return PondModel.findByIdAndDelete(id).exec()
  }

}