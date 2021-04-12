import { Inject, Service } from "typedi";
import { DeleteFishSpecieInput } from "../../../../3-controller/serializers/fish/specie/deleteFishSpecie/deleteFishSpecieInput";
import { FishSpecieNotFound } from "../../../errors/fish/fishErrors";
import { IFishSpecieRepository, IFishSpecieRepositoryToken } from "../../../repositories/iFishSpecieRepository";

@Service({ transient: true })
export class DeleteFishSpecieUseCase {
  @Inject(IFishSpecieRepositoryToken)
  private readonly fishRepo!: IFishSpecieRepository

  async run({ id }: DeleteFishSpecieInput): Promise<boolean> {
    const fish = await this.fishRepo.findOne(id)
    if (!fish) {
      throw FishSpecieNotFound
    }

    await this.fishRepo.delete(id)
    return true
  }
}