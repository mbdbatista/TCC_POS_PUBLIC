import { IExcelService, IExcelServiceToken } from "../../2-business/services/iExcelService";
import { Workbook, TableColumnProperties, Worksheet } from 'exceljs'
import { Service } from "typedi";
import { FileModel } from "../../1-domain/models/fileModel";
import { openSync, track } from 'temp'
import moment from 'moment-timezone'

@Service({ id: IExcelServiceToken, transient: true })
export class ExcelService implements IExcelService {
  async generateXlsFile(name: string, header: string[], data: {[key: string]: any}[]): Promise<FileModel> {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet(name)
    this.createTable(worksheet, name, header, data)
    return this.writeFile(workbook, name)
  }

  private async writeFile(workbook: Workbook, name: string): Promise<FileModel> {
    const date = moment.tz(new Date(), 'America/Sao_Paulo')
    const filename = `${name}-${date.format('YYYY-MM-DD HH:mm:ss')}.xls`
    track()
    const { path } = openSync()    
    await workbook.xlsx.writeFile(path)
    return {
      path: path,
      filename: filename
    }
  }

  private createTable(worksheet: Worksheet, name: string, header: string[], data: {[key: string]: any}[]): void {
    const table = worksheet.addTable({
      headerRow: true,
      columns: this.buildHeader(header),
      name: name,
      ref: 'A1',
      rows: this.buildRows(data, header)      
    })
    table.commit()
  }

  private buildHeader = (header: string[]): TableColumnProperties[] => {
    return header.map(e => (
      {
        name: e
      }
    ))
  }

  private buildRows = (data: {[key: string]: any}[], header: string[]): any[][] => {
    const rowsQt = data.length
    let rows: any[][] = []
    for (let index = 0; index < rowsQt; index++) {
      const row = header.map(e => {
        const currentRow = data[index]
        return currentRow[e]
      })
      rows.push(row)
    }
    return rows
  }
}