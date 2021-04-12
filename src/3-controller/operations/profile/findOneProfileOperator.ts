import { Inject, Service } from "typedi";
import { Profile } from "../../../1-domain/entities/profile";
import { FindOneProfileUseCase } from "../../../2-business/useCases/profile/findOneProfileUseCase";
import { InputFindOneProfile } from "../../serializers/profile/findOne/inputFindOneProfile";
import { OutputFindOneProfile } from "../../serializers/profile/findOne/outputFindOneProfile";
import { BaseOperator } from "../base/baseOperator";

@Service({ transient: true })
export class FindOneProfileOperator extends BaseOperator<InputFindOneProfile, OutputFindOneProfile> {
  @Inject()
  private readonly useCase!: FindOneProfileUseCase

  async run(input: InputFindOneProfile): Promise<OutputFindOneProfile> {
    const result = await this.useCase.run(input)
    return this.mapper(result)
  }

  private mapper = (entity: Profile): OutputFindOneProfile => {
    const mapped: Profile = {
      actions: entity.actions.map(e => {
        return {
          access: e.access,
          route: e.route
        }
      }),
      active: entity.active,
      id: entity.id,
      name: entity.name
    }
    return { 
      data: mapped
    }
  }
}