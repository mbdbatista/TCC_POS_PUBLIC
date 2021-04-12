import { Token } from "typedi";
import { Stream } from "stream";
import { FileModel } from "../../1-domain/models/fileModel";

export const IExcelServiceToken = new Token<IExcelService>()
export interface IExcelService {
  generateXlsFile(name: string, header: string[], data: {[key: string]: any}[]): Promise<FileModel>
}