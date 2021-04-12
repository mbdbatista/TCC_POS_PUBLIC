import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../base/baseInput";

export class InputFindOneProfile extends BaseInput { 
  @IsNotEmpty()
  id!: string

  constructor(obj: Partial<InputFindOneProfile>){
    super()
    Object.assign(this, obj)
  }
}