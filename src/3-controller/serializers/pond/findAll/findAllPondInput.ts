import { BaseInput } from "../../base/baseInput"

export class FindAllPondInput extends BaseInput {  
  name?: string

  constructor(obj: Partial<FindAllPondInput>) {
    super()
    Object.assign(this, obj)
  }
}