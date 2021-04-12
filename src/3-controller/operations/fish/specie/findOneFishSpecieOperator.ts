import { Inject, Service } from "typedi";
import { FishSpecie } from "../../../../1-domain/entities/fish/fishSpecies";
import { FindOneFishSpecieUseCase } from "../../../../2-business/useCases/fish/specie/findOneFishSpecieUseCase";
import { FindOneFishSpecieInput } from "../../../serializers/fish/specie/findOneFishSpecie/findOneFishSpecieInput";
import { FindOneFishSpecieOutput } from "../../../serializers/fish/specie/findOneFishSpecie/findOneFishSpecieOutput";
import { BaseOperator } from "../../base/baseOperator";

@Service({ transient: true })
export class FindOneFishSpecieOperator extends BaseOperator<FindOneFishSpecieInput, FindOneFishSpecieOutput> {
  @Inject()
  private readonly useCase!: FindOneFishSpecieUseCase


  async run(input: FindOneFishSpecieInput): Promise<FindOneFishSpecieOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: FishSpecie): FindOneFishSpecieOutput {
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