import { Inject, Service } from "typedi";
import { FishBreeding } from "../../../../1-domain/entities/fish/fishBreeding";
import { CreateFishBreedingUseCase } from "../../../../2-business/useCases/fish/breeding/createFishBreedingUseCase";
import { FindAllFishBreedingUseCase } from "../../../../2-business/useCases/fish/breeding/findAllFishBreedingUseCase";
import { FindAllFishBreedingInput } from "../../../serializers/fish/breeding/findAll/findAllFishBreedingInput";
import { FindAllFishBreedingOutput } from "../../../serializers/fish/breeding/findAll/findAllFishBreedingOutput";
import { BaseOperator } from "../../base/baseOperator";

@Service({ transient: true })
export class FindAllFishBreedingOperator extends BaseOperator<FindAllFishBreedingInput, FindAllFishBreedingOutput> {
  @Inject()
  private readonly useCase!: FindAllFishBreedingUseCase

  async run(input: FindAllFishBreedingInput): Promise<FindAllFishBreedingOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: FishBreeding[]): FindAllFishBreedingOutput {
    const fishBreedings = entity.map(e => ({
      id: e.id,
      createdDate: e.createdDate,      
      fishSpecie: e.fishSpecie,
      pond: e.pond,
      quantity: e.quantity,
      userId: e.userId,
      endDate: e.endDate
    }))

    return {
      data: fishBreedings
    }
  }
}