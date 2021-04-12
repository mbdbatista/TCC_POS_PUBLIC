import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../../base/baseInput";

export class DeleteFishSpecieInput extends BaseInput { 
  @IsNotEmpty()
  id!: string
  constructor(obj: Partial<DeleteFishSpecieInput>) {
    super()
    Object.assign(this, obj)
  }
}