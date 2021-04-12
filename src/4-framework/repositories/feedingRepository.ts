import { Service } from "typedi";
import mongoose from 'mongoose'
import { Feeding } from "../../1-domain/entities/feeding";
import { IFeedingRepository, IFeedingRepositoryToken } from "../../2-business/repositories/iFeedingRepository";
import { FeedingModel } from "../database/models/feedingModel";

@Service({ id: IFeedingRepositoryToken, transient: true })
export class FeedingRepository implements IFeedingRepository {
  find(userId: string): Promise<Feeding[]> {
    return FeedingModel.find({ userId: userId }).exec()
  }
  create(entity: Partial<Feeding>[]): Promise<Feeding[]> {
    const entityWithIds = entity.map(e => {
      const id = mongoose.Types.ObjectId().toHexString()
      return {
        id,
        createdDate: e.createdDate,
        readed: e.readed,
        userId: e.userId
      } as Feeding
    })
    return FeedingModel.insertMany(entityWithIds)
  }
  update(id: string, entity: Partial<Feeding>): Promise<Feeding | null> {
    return FeedingModel.findByIdAndUpdate(id, { readed: entity.readed }).exec()
  }

}