import { Schema, Document, model } from "mongoose"
import { FishSpecie } from "../../../1-domain/entities/fish/fishSpecies"

export interface IFishSpecieDocument extends FishSpecie, Document {
  id: string
}

const FishSchema = new Schema<IFishSpecieDocument>({
  name: { type: String, required: true },
  carnivore: { type: Boolean, required: true },
  sizes: [
    {
      size: { type: Number, required: true },
      unitsPerMeter: { type: Number, required: true }
    }
  ]
})

export const FishSpecieModel = model<IFishSpecieDocument>(
  'FishSpecie',
  FishSchema,
  'fishSpecie'
)