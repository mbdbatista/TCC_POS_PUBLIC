import { Inject, Service } from "typedi";
import { FishSpecie } from "../../../../1-domain/entities/fish/fishSpecies";
import { ListFishSpecieUseCase } from "../../../../2-business/useCases/fish/specie/listFishSpecieUseCase";
import { ListFishSpecieInput } from "../../../serializers/fish/specie/listFishSpecie/listFishSpecieInput";
import { ListFishSpecieOutput } from "../../../serializers/fish/specie/listFishSpecie/listFishSpecieOutput";

@Service({ transient: true })
export class ListFishSpecieOperator {
  @Inject()
  private readonly useCase!: ListFishSpecieUseCase

  async run(input: ListFishSpecieInput): Promise<ListFishSpecieOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: FishSpecie[]): ListFishSpecieOutput {
    const fishes = entity.map(e => {
      return {
        name: e.name,
        carnivore: e.carnivore,
        id: e.id,
        sizes: e.sizes.map(s => {
          return {
            id: s.id,
            size: s.size,
            unitsPerMeter: s.unitsPerMeter
          }
        })
      }
    })

    return { 
      data: fishes
    }
  }
}