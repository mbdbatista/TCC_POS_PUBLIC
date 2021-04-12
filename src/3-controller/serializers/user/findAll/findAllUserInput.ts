import { BaseInput } from "../../base/baseInput";

export class FindAllUserInput extends BaseInput {
  profile?: string
  name?: string
  email?: string
  
  constructor(obj: Partial<FindAllUserInput>){
    super()
    Object.assign(this, obj)
  }
}