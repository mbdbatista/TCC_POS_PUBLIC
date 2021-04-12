import { BaseInput } from "../../base/baseInput";

export class InputFindAllProfile extends BaseInput {
  name?: string

  constructor(obj: Partial<InputFindAllProfile>){
    super()
    Object.assign(this, obj)
  }
}