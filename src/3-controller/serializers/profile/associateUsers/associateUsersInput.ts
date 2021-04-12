import { IsArray, IsNotEmpty } from "class-validator";
import { BaseInput } from "../../base/baseInput";

export class AssociateUsersInput extends BaseInput {
  @IsNotEmpty()
  @IsArray()
  users!: string[]

  @IsNotEmpty()
  id!: string

  constructor(obj: Partial<AssociateUsersInput>) {
    super()
    Object.assign(this, obj)
  }
}
