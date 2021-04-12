import { Inject, Service } from "typedi"
import { FishBreeding } from "../../../../1-domain/entities/fish/fishBreeding"
import { UpdateFishBreedingUseCase } from "../../../../2-business/useCases/fish/breeding/updateFishBreedingUseCase"
import { UpdateFishBreedingInput } from "../../../serializers/fish/breeding/update/updateFishBreedingInput"
import { UpdateFishBreedingOutput } from "../../../serializers/fish/breeding/update/updateFishBreedingOutput"
import { BaseOperator } from "../../base/baseOperator"

@Service({ transient: true })
export class UpdateFishBreedingOperator extends BaseOperator<UpdateFishBreedingInput, UpdateFishBreedingOutput> {
  @Inject()
  private readonly useCase!: UpdateFishBreedingUseCase


  async run(input: UpdateFishBreedingInput): Promise<UpdateFishBreedingOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: FishBreeding): UpdateFishBreedingOutput {
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