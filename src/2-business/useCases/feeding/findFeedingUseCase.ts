import { Inject, Service } from "typedi";
import { Feeding } from "../../../1-domain/entities/feeding";
import { FindFeedingInput } from "../../../3-controller/serializers/feeding/find/findFeedingInput";
import { IFeedingRepository, IFeedingRepositoryToken } from "../../repositories/iFeedingRepository";

@Service({ transient: false })
export class FindFeedingUseCase {
  @Inject(IFeedingRepositoryToken)
  private readonly feedingRepo!: IFeedingRepository

  async run({ user }: FindFeedingInput): Promise<Feeding[]> {
    const userId = (user || {}).id
    return await this.feedingRepo.find(userId || '')
  }

}