import { Inject, Service } from "typedi";
import { FileModel } from "../../../1-domain/models/fileModel";
import { ExportUserInput } from "../../../3-controller/serializers/user/export/exportUserInput";
import { IExcelService, IExcelServiceToken } from "../../services/iExcelService";
import { FindAllUserUseCase } from "./findAllUserUseCase";
import moment from 'moment-timezone'

@Service({ transient: true })
export class ExportUserUseCase {
  @Inject()
  private readonly findAllUseCase!: FindAllUserUseCase
  @Inject(IExcelServiceToken)
  private readonly excelService!: IExcelService

  async run(input: ExportUserInput): Promise<FileModel> {
    const users = await this.findAllUseCase.run(input)
    const headers = ['Identificador', 'Nome', 'Sobrenome', 'E-mail', 'Data de Nascimento']
    const body = users.map(item => {
      return {
        'Identificador': item.id,
        'Nome': item.firstName,
        'Sobrenome': item.lastName,
        'E-mail': item.email,
        'Data de Nascimento': moment.tz(item.birthDate, 'America/Sao_Paulo').format('DD/MM/YYYY'),
      } as { [key: string]: any }
    })
    return await this.excelService.generateXlsFile('Usuários', headers, body)
  }
}