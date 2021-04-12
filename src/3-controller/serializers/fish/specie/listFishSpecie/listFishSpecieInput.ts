import { BaseInput } from "../../../base/baseInput"

export class ListFishSpecieInput extends BaseInput {
  name?: string

  constructor(obj: Partial<ListFishSpecieInput>){
    super()
    Object.assign(this, obj)
  }
}