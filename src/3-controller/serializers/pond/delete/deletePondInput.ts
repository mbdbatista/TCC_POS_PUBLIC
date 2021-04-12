import { IsNotEmpty } from "class-validator"
import { BaseInput } from "../../base/baseInput"

export class DeletePondInput extends BaseInput {
  @IsNotEmpty()
  id!: string

  constructor(obj: Partial<DeletePondInput>) {
    super()
    Object.assign(this, obj)
  }
}