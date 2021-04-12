import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../base/baseInput";

export class FindOneUserInput extends BaseInput {
  @IsNotEmpty()
  id!: string

  constructor(obj: Partial<FindOneUserInput>) {
    super()
    Object.assign(this, obj)
  }
}