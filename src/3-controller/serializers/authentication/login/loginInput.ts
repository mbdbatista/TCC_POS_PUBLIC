import { IsNotEmpty } from "class-validator"
import { BaseInput } from "../../base/baseInput"

export class LoginInput extends BaseInput { 
  @IsNotEmpty()
  username!: string
  @IsNotEmpty()
  password!: string

  constructor(obj: Partial<LoginInput>){
    super()
    Object.assign(this, obj)
  }
}