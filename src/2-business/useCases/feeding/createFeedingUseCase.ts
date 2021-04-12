import { Inject, Service } from "typedi";
import { IFeedingRepository, IFeedingRepositoryToken } from "../../repositories/iFeedingRepository";
import { IPondRepository, IPondRepositoryToken } from "../../repositories/iPondRepository";

@Service({ transient: true })
export class CreateFeedingUseCase { 
  @Inject(IPondRepositoryToken)
  private readonly pondRepo!: IPondRepository
  @Inject(IFeedingRepositoryToken)
  private readonly feedingRepo!: IFeedingRepository

  async run(): Promise<boolean> {
    const ponds = await this.pondRepo.findAll()
    const distinct = ponds.map(e => e.userId).filter((value, index, self) => self.indexOf(value) === index)

    const feedings = distinct.map(e => {
      return {
        createdDate: new Date(),
        readed: false,
        userId: e
      }
    })

    await this.feedingRepo.create(feedings)

    return true
  }
}