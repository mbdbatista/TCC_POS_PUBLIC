import { Inject, Service } from "typedi";
import { Pond } from "../../../1-domain/entities/pond";
import { FindOnePondUseCase } from "../../../2-business/useCases/pond/findOnePondUseCase";
import { FindOnePondInput } from "../../serializers/pond/findOne/findOnePondInput";
import { FindOnePondOutput } from "../../serializers/pond/findOne/findOnePondOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class FindOnePondOperator extends BaseOperator<FindOnePondInput, FindOnePondOutput> {
  @Inject()
  private readonly useCase!: FindOnePondUseCase


  async run(input: FindOnePondInput): Promise<FindOnePondOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: Pond): FindOnePondOutput {
    const pond: Pond = {
      height: entity.height,
      length: entity.length,
      meters: entity.meters,
      userId: entity.userId,
      width: entity.width,
      id: entity.id,
      name: entity.name
    }

    return {
      data: pond
    }
  }
}