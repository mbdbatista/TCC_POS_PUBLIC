import { IsNotEmpty, IsNumber } from "class-validator";
import { BaseInput } from "../../base/baseInput";

export class CreatePondInput extends BaseInput {
  @IsNotEmpty()
  name!: string
  @IsNotEmpty()
  @IsNumber()
  height!: number
  @IsNotEmpty()
  @IsNumber()
  width!: number
  @IsNotEmpty()
  @IsNumber()
  length!: number

  constructor(obj: Partial<CreatePondInput>) {
    super()
    Object.assign(this, obj)
  }
}