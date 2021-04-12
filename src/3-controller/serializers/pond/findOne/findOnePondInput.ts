import { IsNotEmpty } from "class-validator"
import { BaseInput } from "../../base/baseInput"

export class FindOnePondInput extends BaseInput {
  @IsNotEmpty()
  id!: string

  constructor(obj: Partial<FindOnePondInput>) {
    super()
    Object.assign(this, obj)
  }
}