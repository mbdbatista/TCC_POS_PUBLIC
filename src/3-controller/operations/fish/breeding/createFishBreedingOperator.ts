import { Inject, Service } from "typedi";
import { FishBreeding } from "../../../../1-domain/entities/fish/fishBreeding";
import { CreateFishBreedingUseCase } from "../../../../2-business/useCases/fish/breeding/createFishBreedingUseCase";
import { CreateFishBreedingInput } from "../../../serializers/fish/breeding/create/createFishBreedingInput";
import { CreateFishBreedingOutput } from "../../../serializers/fish/breeding/create/createFishBreedingOutput";
import { BaseOperator } from "../../base/baseOperator";

@Service({ transient: true })
export class CreateFishBreedingOperator extends BaseOperator<CreateFishBreedingInput, CreateFishBreedingOutput> {
  @Inject()
  private readonly useCase!: CreateFishBreedingUseCase

  async run(input: CreateFishBreedingInput): Promise<CreateFishBreedingOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: FishBreeding): CreateFishBreedingOutput {
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