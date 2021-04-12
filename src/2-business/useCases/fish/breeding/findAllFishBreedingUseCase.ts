import { Inject, Service } from "typedi";
import { FishBreeding } from "../../../../1-domain/entities/fish/fishBreeding";
import { FindAllFishBreedingInput } from "../../../../3-controller/serializers/fish/breeding/findAll/findAllFishBreedingInput";
import { IFishBreedingRepository, IFishBreedingRepositoryToken } from "../../../repositories/iFishBreedingRepository";

@Service({ transient: true })
export class FindAllFishBreedingUseCase {
  @Inject(IFishBreedingRepositoryToken)
  private readonly fishBreedingRepo!: IFishBreedingRepository

  async run({ pond, fishSpecie, user }: FindAllFishBreedingInput): Promise<FishBreeding[]> {
    let fishBreedings = await this.fishBreedingRepo.findAll()
    
    if (pond) {
      fishBreedings = fishBreedings.filter(e => e.pond === pond)
    }

    if (fishSpecie) {
      fishBreedings = fishBreedings.filter(e => e.fishSpecie === fishSpecie)
    }

    const isAdmin = ((user && user.profile?.actions.length === 0) || false)
    if (!isAdmin) {
      fishBreedings = fishBreedings.filter(e => e.userId === user?.id)
    }

    return fishBreedings
  }
}