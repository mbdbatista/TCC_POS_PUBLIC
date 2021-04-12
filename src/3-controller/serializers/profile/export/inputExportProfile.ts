import { BaseInput } from "../../base/baseInput";

export class InputExportProfile extends BaseInput {
  name?: string

  constructor(obj: Partial<InputExportProfile>){
    super()
    Object.assign(this, obj)
  }
}