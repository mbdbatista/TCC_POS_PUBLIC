import { Inject, Service } from "typedi";
import { Pond } from "../../../1-domain/entities/pond";
import { CreatePondUseCase } from "../../../2-business/useCases/pond/createPondUseCase";
import { CreatePondInput } from "../../serializers/pond/create/createPondInput";
import { CreatePondOutput } from "../../serializers/pond/create/createPondOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class CreatePondOperator extends BaseOperator<CreatePondInput, CreatePondOutput> {
  @Inject()
  private readonly useCase!: CreatePondUseCase

  async run(input: CreatePondInput): Promise<CreatePondOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: Pond): CreatePondOutput {
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