import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../base/baseInput";

export class UpdateFeedingInput extends BaseInput {
  @IsNotEmpty()
  id!: string

  constructor(obj: Partial<UpdateFeedingInput>) {
    super()
    Object.assign(this, obj)
  }
}