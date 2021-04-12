import { Inject, Service } from "typedi";
import { FishSpecie } from "../../../../1-domain/entities/fish/fishSpecies";
import { FindOneFishSpecieInput } from "../../../../3-controller/serializers/fish/specie/findOneFishSpecie/findOneFishSpecieInput";
import { FishSpecieNotFound } from "../../../errors/fish/fishErrors";
import { IFishSpecieRepository, IFishSpecieRepositoryToken } from "../../../repositories/iFishSpecieRepository";

@Service({ transient: true })
export class FindOneFishSpecieUseCase {
  @Inject(IFishSpecieRepositoryToken)
  private readonly fishRepo!: IFishSpecieRepository

  async run({ id }: FindOneFishSpecieInput): Promise<FishSpecie> {
    const fish = await this.fishRepo.findOne(id)
    if (!fish) {
      throw FishSpecieNotFound
    }
    return fish
  }
}