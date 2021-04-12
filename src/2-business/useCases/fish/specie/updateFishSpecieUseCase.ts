import { Inject, Service } from "typedi";
import { FishSpecie } from "../../../../1-domain/entities/fish/fishSpecies";
import { UpdateFishSpecieInput } from "../../../../3-controller/serializers/fish/specie/updateFishSpecie/updateFishSpecieInput";
import { FishSpecieNotFound } from "../../../errors/fish/fishErrors";
import { IFishSpecieRepository, IFishSpecieRepositoryToken } from "../../../repositories/iFishSpecieRepository";

@Service({ transient: true })
export class UpdateFishSpecieUseCase { 
  @Inject(IFishSpecieRepositoryToken)
  private readonly fishRepo!: IFishSpecieRepository

  async run({ id, name, carnivore, sizes }: UpdateFishSpecieInput): Promise<FishSpecie> {
    const fish = await this.fishRepo.findOne(id)
    if (!fish) {
      throw FishSpecieNotFound
    }

    const newFish = await this.fishRepo.update(id, {
      name, carnivore, sizes
    })

    if (!newFish) {
      throw FishSpecieNotFound
    }

    return newFish
  }
}