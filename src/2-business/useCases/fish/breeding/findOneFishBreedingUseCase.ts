import { Inject, Service } from "typedi";
import { FishBreeding } from "../../../../1-domain/entities/fish/fishBreeding";
import { FindOneFishBreedingInput } from "../../../../3-controller/serializers/fish/breeding/findOne/findOneFishBreedingInput";
import { FishBreedingNotFound } from "../../../errors/fish/fishBreedingErrors";
import { IFishBreedingRepository, IFishBreedingRepositoryToken } from "../../../repositories/iFishBreedingRepository";

@Service({ transient: true })
export class FindOneFishBreedingUseCase {
  @Inject(IFishBreedingRepositoryToken)
  private readonly fishBreedingRepo!: IFishBreedingRepository

  async run({ id }: FindOneFishBreedingInput): Promise<FishBreeding> {
    const fishBreeding = await this.fishBreedingRepo.findOne(id)
    if (!fishBreeding) {
      throw FishBreedingNotFound
    }
    
    return fishBreeding
  }
}