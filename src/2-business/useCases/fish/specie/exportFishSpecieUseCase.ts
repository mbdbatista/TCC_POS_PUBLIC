import { Inject, Service } from "typedi";
import { FileModel } from "../../../../1-domain/models/fileModel";
import { ExportFishSpecieInput } from "../../../../3-controller/serializers/fish/specie/exportFishSpecie/exportFishSpecieInput";
import { IExcelService, IExcelServiceToken } from "../../../services/iExcelService";
import { ListFishSpecieUseCase } from "./listFishSpecieUseCase";

@Service({ transient: true })
export class ExportFishSpecieUseCase {
  @Inject()
  private readonly listUseCase!: ListFishSpecieUseCase
  @Inject(IExcelServiceToken)
  private readonly excelService!: IExcelService

  async run(input: ExportFishSpecieInput): Promise<FileModel> {
    const species = await this.listUseCase.run(input)
    const headers = ['Identificador', 'Nome', 'Carnivoro ?', 'Tamanhos']
    const body = species.map(item => {
      return {
        'Identificador': item.id,
        'Nome': item.name,
        'Carnivoro ?': item.carnivore ? 'Sim' : 'Não',
        'Tamanhos': item.sizes.map(e => (`Tamanho: ${e.size}, Unidades: ${e.unitsPerMeter}`)).join(';')
      } as { [key: string]: any }
    })
    return await this.excelService.generateXlsFile('Espécies de Peixes', headers, body)
  }
}