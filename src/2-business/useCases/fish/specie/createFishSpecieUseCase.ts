import { Inject, Service } from "typedi";
import { eventType } from "../../../../1-domain/entities/auditLog";
import { FishSpecie } from "../../../../1-domain/entities/fish/fishSpecies";
import { CreateFishSpecieInput } from "../../../../3-controller/serializers/fish/specie/createFishSpecie/createFishSpecieInput";
import { FishSpecieAlreadyRegistered } from "../../../errors/fish/fishErrors";
import { IFishSpecieRepository, IFishSpecieRepositoryToken } from "../../../repositories/iFishSpecieRepository";
import { CreateAuditLogUseCase, CreateAuditLogUseCaseToken } from "../../auditLog/createAuditLogUseCase";

@Service({ transient: true })
export class CreateFishSpecieUseCase { 
  @Inject(IFishSpecieRepositoryToken)
  private readonly fishSpecieRepo!: IFishSpecieRepository
  @Inject(CreateAuditLogUseCaseToken)
  private readonly auditLog!: CreateAuditLogUseCase

  async run({name, carnivore, sizes, user}: CreateFishSpecieInput): Promise<FishSpecie> {
    const fishSpecie = await this.fishSpecieRepo.findByName(name)
    if (fishSpecie) {
      throw FishSpecieAlreadyRegistered
    }

    const newFishSpecie = await this.fishSpecieRepo.create({
      name: name,
      carnivore: carnivore,
      sizes: sizes
    })

    await this.auditLog.run({
      event: eventType.fish_specie_created,
      user: user
    })

    return newFishSpecie
  }

}