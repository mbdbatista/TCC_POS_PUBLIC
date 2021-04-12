import { BaseInput } from "../../../base/baseInput";

export class FindAllFishBreedingInput extends BaseInput {
  fishSpecie?: string  
  pond?: string

  constructor(obj: Partial<FindAllFishBreedingInput>) {
    super()
    Object.assign(this, obj)
  }
}