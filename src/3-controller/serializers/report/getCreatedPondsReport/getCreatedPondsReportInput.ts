import { BaseInput } from "../../base/baseInput";

export class GetCreatedPondsReportInput extends BaseInput {
  year?: number

  constructor(obj: Partial<GetCreatedPondsReportInput>) {
    super()
    Object.assign(this, obj)
  }
}