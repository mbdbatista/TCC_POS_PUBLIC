import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../base/baseInput";

export class CreateUserInput extends BaseInput { 
  @IsNotEmpty()
  firstName!: string;
  lastName!: string;
  @IsNotEmpty() 
  email!: string;
  @IsNotEmpty()
  password!: string;
  @IsNotEmpty()
  birthDate!: Date;

  constructor(obj: Partial<CreateUserInput>) {
    super()
    Object.assign(this,obj)
  }
}