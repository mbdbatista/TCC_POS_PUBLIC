import { Inject, Service } from "typedi";
import { Pond } from "../../../1-domain/entities/pond";
import { UpdatePondInput } from "../../../3-controller/serializers/pond/update/updatePondInput";
import { PondNotFound } from "../../errors/pond/pondErrors";
import { IPondRepository, IPondRepositoryToken } from "../../repositories/iPondRepository";

@Service({ transient: true })
export class UpdatePondUseCase {
  @Inject(IPondRepositoryToken)
  private readonly pondRepo!: IPondRepository

  async run({ id, name, width, height, length, user }: UpdatePondInput): Promise<Pond> {
    const pond = await this.pondRepo.findOne(id)
    if (!pond) {
      throw PondNotFound
    }
    const meters = length * width * height
    const userId = user?.id ?? ''
    const newPond = await this.pondRepo.update(id, {
      name, width, height, length, meters, userId
    })

    if (!newPond) {
      throw PondNotFound
    }

    return newPond
  }
}