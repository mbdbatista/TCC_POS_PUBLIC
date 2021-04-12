import { BaseInput } from "../../base/baseInput"

export class ExportPondInput extends BaseInput {
  name?: string

  constructor(obj: Partial<ExportPondInput>) {
    super()
    Object.assign(this, obj)
  }
}