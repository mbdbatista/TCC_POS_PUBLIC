import { IsNotEmpty } from "class-validator";
import { BaseInput } from "../../../base/baseInput";

export class CreateFishBreedingInput extends BaseInput {
  @IsNotEmpty()
  fishSpecie!: string
  @IsNotEmpty()
  pond!: string
  @IsNotEmpty()
  quantity!: number
  createdDate!: Date
  endDate?: Date

  constructor(obj: Partial<CreateFishBreedingInput>) {
    super()
    Object.assign(this, obj)
  }
}