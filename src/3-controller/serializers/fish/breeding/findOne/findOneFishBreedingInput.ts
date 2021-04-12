import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../../base/baseInput";

export class FindOneFishBreedingInput extends BaseInput {
  @IsNotEmpty()
  id!: string

  constructor(obj: Partial<FindOneFishBreedingInput>) {
    super()
    Object.assign(this, obj)
  }
}