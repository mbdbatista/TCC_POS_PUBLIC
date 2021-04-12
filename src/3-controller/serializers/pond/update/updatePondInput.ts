import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../base/baseInput";

export class UpdatePondInput extends BaseInput {
  @IsNotEmpty()
  id!: string
  @IsNotEmpty()
  name!: string
  @IsNotEmpty()
  height!: number
  @IsNotEmpty()
  width!: number
  @IsNotEmpty()
  length!: number

  constructor(obj: Partial<UpdatePondInput>) {
    super()
    Object.assign(this, obj)
  }
}