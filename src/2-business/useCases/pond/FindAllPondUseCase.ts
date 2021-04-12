import { Inject, Service } from "typedi";
import { Pond } from "../../../1-domain/entities/pond";
import { FindAllPondInput } from "../../../3-controller/serializers/pond/findAll/findAllPondInput";
import { IPondRepository, IPondRepositoryToken } from "../../repositories/iPondRepository";

@Service({ transient: true })
export class FindAllPondUseCase {
  @Inject(IPondRepositoryToken)
  private readonly pondRepo!: IPondRepository

  async run({ name, user }: FindAllPondInput): Promise<Pond[]> {
    let ponds = await this.pondRepo.findAll()

    if (name) {
      ponds = ponds.filter(e => e.name.includes(name))
    }
    const isAdmin = ((user && user.profile?.actions.length === 0) || false)
    if (!isAdmin) {
      ponds = ponds.filter(e => e.userId === user?.id)
    }

    return ponds
  }
}