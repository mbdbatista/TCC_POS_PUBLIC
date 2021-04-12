import { Inject, Service } from "typedi";
import { Pond } from "../../../1-domain/entities/pond";
import { FindAllPondUseCase } from "../../../2-business/useCases/pond/FindAllPondUseCase";
import { FindAllPondInput } from "../../serializers/pond/findAll/findAllPondInput";
import { FindAllPondOutput } from "../../serializers/pond/findAll/findAllPondOutput";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class FindAllPondOperator extends BaseOperator<FindAllPondInput, FindAllPondOutput> {
  @Inject()
  private readonly useCase!: FindAllPondUseCase

  async run(input: FindAllPondInput): Promise<FindAllPondOutput> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: Pond[]): FindAllPondOutput {
    const ponds = entity.map(e => {
      return {
        height: e.height,
        length: e.length,
        meters: e.meters,
        userId: e.userId,
        width: e.width,
        id: e.id,
        name: e.name
      }
    })

    return {
      data: ponds
    }
  }
}