import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../base/baseInput";

export class DeleteUserInput extends BaseInput { 
  @IsNotEmpty()
  id!: string;

  constructor(obj: Partial<DeleteUserInput>) {
    super()
    Object.assign(this,obj)
  }
}