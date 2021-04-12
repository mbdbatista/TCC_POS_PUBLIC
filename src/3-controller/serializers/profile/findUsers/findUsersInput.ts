import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../base/baseInput";

export class FindUsersInput extends BaseInput {
  @IsNotEmpty()
  id!: string

  constructor(obj: Partial<FindUsersInput>) {
    super()
    Object.assign(this, obj)
  }
}