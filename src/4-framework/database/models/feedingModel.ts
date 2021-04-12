import { Schema, Document, model } from "mongoose"
import { Feeding } from "../../../1-domain/entities/feeding"

export interface IFeedingDocument extends Feeding, Document {
  id: string
}

const FeedingSchema = new Schema<IFeedingDocument>({
  readed: { type: Boolean, required: true },
  userId: { type: String, required: true },
  createdDate: { type: Date, required: true }
})

export const FeedingModel = model<IFeedingDocument>(
  'Feeding',
  FeedingSchema,
  'Feeding'
)