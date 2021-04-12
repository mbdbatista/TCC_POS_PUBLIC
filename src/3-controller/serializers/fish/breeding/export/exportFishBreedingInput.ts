import { BaseInput } from "../../../base/baseInput";

export class ExportFishBreedingInput extends BaseInput {
  fishSpecie?: string  
  pond?: string

  constructor(obj: Partial<ExportFishBreedingInput>) {
    super()
    Object.assign(this, obj)
  }
}