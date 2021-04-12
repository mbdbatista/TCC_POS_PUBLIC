import { Service, Inject } from 'typedi'
import { eventType } from '../../../1-domain/entities/auditLog'
import { User } from '../../../1-domain/entities/user'
import { CreateUserInput } from '../../../3-controller/serializers/user/create/createUserInput'
import { ProfileNotFound } from '../../errors/profile/profileError'
import { UserAlreadyRegistered } from '../../errors/user/userErrors'
import { IProfileRepository, IProfileRepositoryToken } from '../../repositories/iProfileRepository'
import { IUserRepository, IUserRepositoryToken } from '../../repositories/iUserRepository'
import { ICryptoService, ICryptoServiceToken } from '../../services/iCryptoService'
import { CreateAuditLogUseCase, CreateAuditLogUseCaseToken } from '../auditLog/createAuditLogUseCase'

@Service({ transient: true })
export class CreateUserUseCase {

  @Inject(IUserRepositoryToken)
  private readonly userRepository!: IUserRepository
  @Inject(IProfileRepositoryToken)
  private readonly profileRespository!: IProfileRepository
  @Inject(ICryptoServiceToken)
  private readonly cryptoService!: ICryptoService
  @Inject(CreateAuditLogUseCaseToken)
  private readonly auditLog!: CreateAuditLogUseCase

  async run(input: CreateUserInput): Promise<User> {
    const findUser = await this.userRepository.findByEmail(input.email)
    if (findUser) { throw UserAlreadyRegistered }
    const hashedPassword = this.cryptoService.hash(input.password)
    const profile = await this.profileRespository.findByName('Visitante')
    if (!profile)
      throw ProfileNotFound
    const user = await this.userRepository.create({
      ...input,
      password: hashedPassword,
      createdDate: new Date(),
      profile: profile.id,
      updatedDate: new Date()
    })

    await this.auditLog.run({
      event: eventType.user_created,
      user: input.user
    })

    return user
  }
}