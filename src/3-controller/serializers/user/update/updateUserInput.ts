import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../base/baseInput"

export class UpdateUserInput extends BaseInput {
  @IsNotEmpty()
  id!: string
  @IsNotEmpty()
  firstName!: string;
  lastName!: string;
  @IsNotEmpty()
  email!: string;
  password!: string;
  @IsNotEmpty()
  birthDate!: Date;

  constructor(obj: Partial<UpdateUserInput>) {
    super()
    Object.assign(this, obj)
  }
}