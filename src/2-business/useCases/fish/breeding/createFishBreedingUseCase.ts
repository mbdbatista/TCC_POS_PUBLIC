import { Inject, Service } from "typedi";
import { eventType } from "../../../../1-domain/entities/auditLog";
import { FishBreeding } from "../../../../1-domain/entities/fish/fishBreeding";
import { CreateFishBreedingInput } from "../../../../3-controller/serializers/fish/breeding/create/createFishBreedingInput";
import { UserNotFound } from "../../../errors/authentication/loginErrors";
import { IFishBreedingRepository, IFishBreedingRepositoryToken } from "../../../repositories/iFishBreedingRepository";
import { CreateAuditLogUseCase, CreateAuditLogUseCaseToken } from "../../auditLog/createAuditLogUseCase";

@Service({ transient: true })
export class CreateFishBreedingUseCase {
  @Inject(IFishBreedingRepositoryToken)
  private readonly fishBreedingRepo!: IFishBreedingRepository
  @Inject(CreateAuditLogUseCaseToken)
  private readonly auditLog!: CreateAuditLogUseCase

  async run({ fishSpecie, pond, quantity, createdDate, endDate, user }: CreateFishBreedingInput): Promise<FishBreeding> {
    if (!user) {
      throw UserNotFound
    }

    const fishBreeding = await this.fishBreedingRepo.create({
      fishSpecie,
      pond,
      quantity,
      createdDate,
      endDate,
      userId: user.id
    })

    await this.auditLog.run({
      event: eventType.fish_breeding_started,
      user: user
    })

    return fishBreeding
  }
}