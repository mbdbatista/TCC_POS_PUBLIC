import { Inject, Service } from "typedi";
import { Pond } from "../../../1-domain/entities/pond";
import { FindOnePondInput } from "../../../3-controller/serializers/pond/findOne/findOnePondInput";
import { PondNotFound } from "../../errors/pond/pondErrors";
import { IPondRepository, IPondRepositoryToken } from "../../repositories/iPondRepository";

@Service({ transient: true })
export class FindOnePondUseCase {
  @Inject(IPondRepositoryToken)
  private readonly pondRepo!: IPondRepository

  async run({ id }: FindOnePondInput): Promise<Pond> {
    const pond = await this.pondRepo.findOne(id)
    if (!pond) {
      throw PondNotFound
    }
    return pond
  }
}