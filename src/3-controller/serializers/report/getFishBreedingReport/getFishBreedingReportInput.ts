import { BaseInput } from "../../base/baseInput";

export class GetFishBreedingReportInput extends BaseInput {
  year?: number

  constructor(obj: Partial<GetFishBreedingReportInput>) {
    super()
    Object.assign(this, obj)
  }
}