import { Inject, Service } from "typedi";
import { FileModel } from "../../../1-domain/models/fileModel";
import { ExportPondInput } from "../../../3-controller/serializers/pond/export/exportPondInput";
import { IExcelService, IExcelServiceToken } from "../../services/iExcelService";
import { FindAllPondUseCase } from "./FindAllPondUseCase";

@Service({ transient: true })
export class ExportPondUseCase {
  @Inject()
  private readonly listUseCase!: FindAllPondUseCase
  @Inject(IExcelServiceToken)
  private readonly excelService!: IExcelService

  async run(input: ExportPondInput): Promise<FileModel> {
    const ponds = await this.listUseCase.run(input)
    const headers = ['Identificador', 'Nome', 'Altura', 'Largura', 'Comprimento', 'Metros Cúbicos']
    const body = ponds.map(item => {
      return {
        'Identificador': item.id,
        'Nome': item.name,
        'Altura': item.height,
        'Largura': item.width,
        'Comprimento': item.length,
        'Metros Cúbicos': item.meters,
      } as { [key: string]: any }
    })
    return await this.excelService.generateXlsFile('Tanques', headers, body)
  }
}