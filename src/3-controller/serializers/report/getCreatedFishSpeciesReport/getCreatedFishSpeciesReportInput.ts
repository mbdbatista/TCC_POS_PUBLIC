import { BaseInput } from "../../base/baseInput";

export class GetCreatedFishSpeciesReportInput extends BaseInput {
  year?: number

  constructor(obj: Partial<GetCreatedFishSpeciesReportInput>) {
    super()
    Object.assign(this, obj)
  }
}