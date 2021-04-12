import { Inject, Service } from "typedi"
import { FishSpecie } from "../../../../1-domain/entities/fish/fishSpecies"
import { UpdateFishSpecieUseCase } from "../../../../2-business/useCases/fish/specie/updateFishSpecieUseCase"
import { UpdateFishSpecieInput } from "../../../serializers/fish/specie/updateFishSpecie/updateFishSpecieInput"
import { UpdateFishSpecieOutput } from "../../../serializers/fish/specie/updateFishSpecie/updateFishSpecieOutput"
import { BaseOperator } from "../../base/baseOperator"

@Service({ transient: true })
export class UpdateFishSpecieOperator extends BaseOperator<UpdateFishSpecieInput, UpdateFishSpecieOutput> {
  @Inject()
  private readonly useCase!: UpdateFishSpecieUseCase


  async run(input: UpdateFishSpecieInput): Promise<UpdateFishSpecieOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: FishSpecie): UpdateFishSpecieOutput {
    const fishSpecie: FishSpecie = {
      name: entity.name,
      carnivore: entity.carnivore,
      id: entity.id,
      sizes: entity.sizes
    }

    return {
      data: fishSpecie
    }
  }
}