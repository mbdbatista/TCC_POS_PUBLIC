import { Inject, Service } from "typedi";
import { FishSpecie } from "../../../../1-domain/entities/fish/fishSpecies";
import { ListFishSpecieInput } from "../../../../3-controller/serializers/fish/specie/listFishSpecie/listFishSpecieInput";
import { IFishSpecieRepository, IFishSpecieRepositoryToken } from "../../../repositories/iFishSpecieRepository";

@Service({ transient: true })
export class ListFishSpecieUseCase {
  @Inject(IFishSpecieRepositoryToken)
  private readonly fishSpecieRepo!: IFishSpecieRepository

  async run({ name }: ListFishSpecieInput): Promise<FishSpecie[]> {
    let species = await this.fishSpecieRepo.findAll()

    if (name) {
      species = species.filter(e => e.name.includes(name))
    }

    return species
  }
}