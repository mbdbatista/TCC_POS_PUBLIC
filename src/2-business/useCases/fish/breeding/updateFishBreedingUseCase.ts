import { Inject, Service } from "typedi";
import { eventType } from "../../../../1-domain/entities/auditLog";
import { FishBreeding } from "../../../../1-domain/entities/fish/fishBreeding";
import { UpdateFishBreedingInput } from "../../../../3-controller/serializers/fish/breeding/update/updateFishBreedingInput";
import { FishBreedingNotFound } from "../../../errors/fish/fishBreedingErrors";
import { IFishBreedingRepository, IFishBreedingRepositoryToken } from "../../../repositories/iFishBreedingRepository";
import { CreateAuditLogUseCase, CreateAuditLogUseCaseToken } from "../../auditLog/createAuditLogUseCase";

@Service({ transient: true })
export class UpdateFishBreedingUseCase {
  @Inject(IFishBreedingRepositoryToken)
  private readonly fishBreedingRepo!: IFishBreedingRepository
  @Inject(CreateAuditLogUseCaseToken)
  private readonly auditLog!: CreateAuditLogUseCase

  async run({ id, user }: UpdateFishBreedingInput): Promise<FishBreeding> {
    const fishBreeding = await this.fishBreedingRepo.findOne(id)
    if (!fishBreeding) {
      throw FishBreedingNotFound
    }

    const newFishBreeding = await this.fishBreedingRepo.update(id, {
      fishSpecie: fishBreeding.fishSpecie,
      pond: fishBreeding.pond,
      quantity: fishBreeding.quantity,
      userId: fishBreeding.userId,
      createdDate: fishBreeding.createdDate,
      endDate: new Date()
    })
    
    if (!newFishBreeding) {
      throw FishBreedingNotFound
    }

    if (newFishBreeding.endDate) {
      await this.auditLog.run({
        event: eventType.fish_breeding_finished,
        user: user
      })
    }

    return newFishBreeding
  }
}