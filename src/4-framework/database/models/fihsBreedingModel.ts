import { Schema, Document, model } from "mongoose"
import { FishBreeding } from "../../../1-domain/entities/fish/fishBreeding"

export interface IFishBreedingDocument extends FishBreeding, Document {
  id: string
}

const FishBreedingSchema = new Schema<IFishBreedingDocument>({
  fishSpecie: { type: Schema.Types.ObjectId, required: true, ref: 'FishSpecie' },
  pond: { type: Schema.Types.ObjectId, required: true, ref: 'Pond' },
  quantity: { type: Number, required: true },
  createdDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  quantitySold: { type: Number, required: false },
  userId: { type: String, required: true }
})

export const FishBreedingModel = model<IFishBreedingDocument>(
  'FishBreeding',
  FishBreedingSchema,
  'FishBreeding'
)