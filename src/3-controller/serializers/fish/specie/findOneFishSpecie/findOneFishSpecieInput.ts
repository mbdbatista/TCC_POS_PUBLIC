import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../../base/baseInput";

export class FindOneFishSpecieInput extends BaseInput {
  @IsNotEmpty()
  id!: string
  constructor(obj: Partial<FindOneFishSpecieInput>) {
    super()
    Object.assign(this, obj)
  }
}