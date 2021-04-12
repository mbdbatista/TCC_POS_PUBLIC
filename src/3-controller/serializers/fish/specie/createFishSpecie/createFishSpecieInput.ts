import { IsArray, IsNotEmpty } from "class-validator";
import { FishSize } from "../../../../../1-domain/entities/fish/fishSpecies";
import { BaseInput } from "../../../base/baseInput";

export class CreateFishSpecieInput extends BaseInput { 
  @IsNotEmpty()
  name!: string
  @IsNotEmpty()
  carnivore!: boolean
  @IsNotEmpty()
  @IsArray()
  sizes!: FishSize[]

  constructor(obj: Partial<CreateFishSpecieInput>) {
    super()
    Object.assign(this, obj)
  }
}