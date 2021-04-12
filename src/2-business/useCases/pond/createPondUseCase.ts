import { Inject, Service } from "typedi";
import { eventType } from "../../../1-domain/entities/auditLog";
import { Pond } from "../../../1-domain/entities/pond";
import { CreatePondInput } from "../../../3-controller/serializers/pond/create/createPondInput";
import { IPondRepository, IPondRepositoryToken } from "../../repositories/iPondRepository";
import { CreateAuditLogUseCase, CreateAuditLogUseCaseToken } from "../auditLog/createAuditLogUseCase";

@Service({ transient: true })
export class CreatePondUseCase {
  @Inject(IPondRepositoryToken)
  private readonly pondRepo!: IPondRepository
  @Inject(CreateAuditLogUseCaseToken)
  private readonly auditLog!: CreateAuditLogUseCase

  async run({ name, height, width, length, user }: CreatePondInput): Promise<Pond> {
    const meters = length * width * height
    const userId = user?.id ?? ''
    const pond = await this.pondRepo.create({
      name: name,
      width: width,
      height: height,
      length: length,
      meters: meters,
      userId: userId
    })

    await this.auditLog.run({
      event: eventType.pond_created,
      user: user
    })

    return pond
  }
}
