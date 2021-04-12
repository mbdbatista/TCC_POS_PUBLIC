import { Inject, Service } from "typedi"
import { Pond } from "../../../1-domain/entities/pond"
import { UpdatePondUseCase } from "../../../2-business/useCases/pond/updatePondUseCase"
import { UpdatePondInput } from "../../serializers/pond/update/updatePondInput"
import { UpdatePondOutput } from "../../serializers/pond/update/updatePondOutput"
import { BaseOperator } from "../base/baseOperator"

@Service({ transient: true })
export class UpdatePondOperator extends BaseOperator<UpdatePondInput, UpdatePondOutput> {
  @Inject()
  private readonly useCase!: UpdatePondUseCase


  async run(input: UpdatePondInput): Promise<UpdatePondOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: Pond): UpdatePondOutput {
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