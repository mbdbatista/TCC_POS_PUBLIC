import { BaseInput } from "../../base/baseInput";

export class ExportUserInput extends BaseInput { 
  profile?: string
  name?: string
  email?: string

  constructor(obj: Partial<ExportUserInput>) {
    super()
    Object.assign(this,obj)
  }
}