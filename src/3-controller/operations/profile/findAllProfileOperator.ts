import { Inject, Service } from "typedi"
import { Profile } from "../../../1-domain/entities/profile"
import { FindAllProfileUseCase } from "../../../2-business/useCases/profile/findAllProfileUseCase"
import { InputFindAllProfile } from "../../serializers/profile/findAll/inputFindAllProfile"
import { OutputFindAllProfile } from "../../serializers/profile/findAll/outputFindAllProfile"
import { BaseOperator } from "../base/baseOperator"

@Service({ transient: true })
export class FindAllProfileOperator extends BaseOperator<any, OutputFindAllProfile> {
  @Inject()
  private readonly useCase!: FindAllProfileUseCase

  async run(input: InputFindAllProfile): Promise<OutputFindAllProfile> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper(entity: Profile[]): OutputFindAllProfile {
    return {
      data: entity.map(e => {
        return {
          actions: e.actions.map(action => {
            return {
              route: action.route,
              access: action.access
            }
          }),
          active: e.active,
          id: e.id,
          name: e.name
        }
      })
    }
  }
}