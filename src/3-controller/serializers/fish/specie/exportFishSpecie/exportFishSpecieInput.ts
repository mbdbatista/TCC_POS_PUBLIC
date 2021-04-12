import { BaseInput } from "../../../base/baseInput"

export class ExportFishSpecieInput extends BaseInput {
  name?: string

  constructor(obj: Partial<ExportFishSpecieInput>){
    super()
    Object.assign(this, obj)
  }
}