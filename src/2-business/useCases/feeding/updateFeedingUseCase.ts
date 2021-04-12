import { Inject, Service } from "typedi";
import { Feeding } from "../../../1-domain/entities/feeding";
import { UpdateFeedingInput } from "../../../3-controller/serializers/feeding/update/updateFeedingInput";
import { FeedingNotFound } from "../../errors/feeding/feedingErrors";
import { IFeedingRepository, IFeedingRepositoryToken } from "../../repositories/iFeedingRepository";

@Service({ transient: true })
export class UpdateFeedingUseCase {
  @Inject(IFeedingRepositoryToken)
  private readonly feedingRepo!: IFeedingRepository

  async run({ id }: UpdateFeedingInput): Promise<Feeding> {
    const feeding = await this.feedingRepo.update(id, {
      readed: true
    })

    if (!feeding) {
      throw FeedingNotFound
    }

    return feeding
  }
}