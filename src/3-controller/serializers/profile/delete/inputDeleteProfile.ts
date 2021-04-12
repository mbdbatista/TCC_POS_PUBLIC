import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../base/baseInput";

export class InputDeleteProfile extends BaseInput { 
  @IsNotEmpty()
  id!: string

  constructor(obj: Partial<InputDeleteProfile>){
    super()
    Object.assign(this,  obj)
  }
}