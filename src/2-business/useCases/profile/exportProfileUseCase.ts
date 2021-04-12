import { Inject, Service } from "typedi";
import { AccessTypeAdapter } from "../../../1-domain/entities/profile";
import { FileModel } from "../../../1-domain/models/fileModel";
import { InputExportProfile } from "../../../3-controller/serializers/profile/export/inputExportProfile";
import { IExcelService, IExcelServiceToken } from "../../services/iExcelService";
import { FindAllProfileUseCase } from "./findAllProfileUseCase";

@Service({ transient: true })
export class ExportProfileUseCase { 
  @Inject()
  private readonly findAllUseCase!: FindAllProfileUseCase
  @Inject(IExcelServiceToken)
  private readonly excelService!: IExcelService

  async run(input: InputExportProfile): Promise<FileModel> {
    const profiles = await this.findAllUseCase.run(input)
    const headers = ['Identificador', 'Nome', 'Ações', 'Ativo']
    const body = profiles.map(item => {
      return {
        'Identificador': item.id,
        'Nome': item.name,
        'Ações': item.actions.map(e => (`Funcionalidade: ${e.route}, Nível de acesso: ${AccessTypeAdapter(e.access)}`)).join(';'),
        'Ativo': item.active ? 'Sim' : 'Não'
      } as { [key: string]: any }
    })
    return await this.excelService.generateXlsFile('Perfis', headers, body)
  }
}