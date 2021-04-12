import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../../base/baseInput";

export class UpdateFishBreedingInput extends BaseInput {
  @IsNotEmpty()
  id!: string  

  constructor(obj: Partial<UpdateFishBreedingInput>) {
    super()
    Object.assign(this, obj)
  }
}