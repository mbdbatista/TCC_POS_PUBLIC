import { IsArray, IsNotEmpty } from "class-validator";
import { FishSize } from "../../../../../1-domain/entities/fish/fishSpecies";
import { BaseInput } from "../../../base/baseInput";

export class UpdateFishSpecieInput extends BaseInput {
  @IsNotEmpty()
  id!: string
  @IsNotEmpty()
  name!: string
  @IsNotEmpty()
  carnivore!: boolean
  @IsNotEmpty()
  @IsArray()
  sizes!: FishSize[]

  constructor(obj: Partial<UpdateFishSpecieInput>) { 
    super()
    Object.assign(this, obj)
  }
}