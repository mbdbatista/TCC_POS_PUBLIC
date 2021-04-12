import { Inject, Service } from "typedi";
import { DeletePondInput } from "../../../3-controller/serializers/pond/delete/deletePondInput";
import { PondNotFound } from "../../errors/pond/pondErrors";
import { IPondRepository, IPondRepositoryToken } from "../../repositories/iPondRepository";

@Service({ transient: true })
export class DeletePondUseCase {
  @Inject(IPondRepositoryToken)
  private readonly pondRepo!: IPondRepository

  async run({ id }: DeletePondInput): Promise<boolean> {
    const pond = await this.pondRepo.findOne(id)
    if (!pond) {
      throw PondNotFound
    }

    await this.pondRepo.delete(id)
    return true
  }
}