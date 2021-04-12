import { Inject, Service } from "typedi";
import { FishSpecie } from "../../../../1-domain/entities/fish/fishSpecies";
import { Pond } from "../../../../1-domain/entities/pond";
import { FileModel } from "../../../../1-domain/models/fileModel";
import { ExportFishBreedingInput } from "../../../../3-controller/serializers/fish/breeding/export/exportFishBreedingInput";
import { IExcelService, IExcelServiceToken } from "../../../services/iExcelService";
import { FindAllFishBreedingUseCase } from "./findAllFishBreedingUseCase";
import moment from 'moment-timezone'

@Service({ transient: true })
export class ExportFishBreedingUseCase {
  @Inject()
  private readonly useCase!: FindAllFishBreedingUseCase
  @Inject(IExcelServiceToken)
  private readonly excelService!: IExcelService

  async run(input: ExportFishBreedingInput): Promise<FileModel> {
    const fishBreedings = await this.useCase.run(input)
    const headers = ['Identificador', 'Espécie de Peixe', 'Tanque', 'Quantidade', 'Data de Criação', 'Data de Finalização']
    const body = fishBreedings.map(item => {
      return {
        'Identificador': item.id,
        'Espécie de Peixe': (item.fishSpecie as FishSpecie)?.name,
        'Tanque': (item.pond as Pond)?.name,
        'Quantidade': item.quantity,
        'Data de Criação': moment.tz(item.createdDate, 'America/Sao_Paulo').format('DD/MM/YYYY'),
        'Data de Finalização': item.endDate ? moment.tz(item.endDate, 'America/Sao_Paulo').format('DD/MM/YYYY') : ''
      } as { [key: string]: any }
    })
    return await this.excelService.generateXlsFile('Criações de Peixe', headers, body)
  }
}