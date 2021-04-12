import { Inject, Service } from "typedi";
import { FishBreeding } from "../../../../1-domain/entities/fish/fishBreeding";
import { FindOneFishBreedingUseCase } from "../../../../2-business/useCases/fish/breeding/findOneFishBreedingUseCase";
import { FindOneFishBreedingInput } from "../../../serializers/fish/breeding/findOne/findOneFishBreedingInput";
import { FindOneFishBreedingOutput } from "../../../serializers/fish/breeding/findOne/findOneFishBreedingOutput";
import { BaseOperator } from "../../base/baseOperator";

@Service({ transient: true })
export class FindOneFishBreedingOperator extends BaseOperator<FindOneFishBreedingInput, FindOneFishBreedingOutput> {
  @Inject()
  private readonly useCase!: FindOneFishBreedingUseCase


  async run(input: FindOneFishBreedingInput): Promise<FindOneFishBreedingOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: FishBreeding): FindOneFishBreedingOutput {
    const fishBreeding: FishBreeding = {
      id: entity.id,
      createdDate: entity.createdDate,      
      fishSpecie: entity.fishSpecie,
      pond: entity.pond,
      quantity: entity.quantity,
      userId: entity.userId,
      endDate: entity.endDate
    }

    return {
      data: fishBreeding
    }
  }
}