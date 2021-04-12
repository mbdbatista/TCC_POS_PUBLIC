import { Inject, Service } from "typedi";
import { FishSpecie } from "../../../../1-domain/entities/fish/fishSpecies";
import { CreateFishSpecieUseCase } from "../../../../2-business/useCases/fish/specie/createFishSpecieUseCase";
import { CreateFishSpecieInput } from "../../../serializers/fish/specie/createFishSpecie/createFishSpecieInput";
import { CreateFishSpecieOutput } from "../../../serializers/fish/specie/createFishSpecie/createFishSpecieOutput";
import { BaseOperator } from "../../base/baseOperator";

@Service({ transient: true })
export class CreateFishSpecieOperator extends BaseOperator<CreateFishSpecieInput, CreateFishSpecieOutput> {
  @Inject()
  private readonly useCase!: CreateFishSpecieUseCase

  async run(input: CreateFishSpecieInput): Promise<CreateFishSpecieOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: FishSpecie): CreateFishSpecieOutput {
    const fishSpecie: FishSpecie = {
      carnivore: entity.carnivore,
      id: entity.id,
      name: entity.name,
      sizes: entity.sizes
    }

    return {
      data: fishSpecie
    }
  }
}