import { Schema, Document, model } from "mongoose"
import { Pond } from "../../../1-domain/entities/pond"

export interface IPondDocument extends Pond, Document {
  id: string
}

const PondSchema = new Schema<IPondDocument>({
  name: { type: String, required: true },
  height: { type: Number, required: true },
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  meters: { type: Number, required: true },
  userId: { type: String, required: false }
})

export const PondModel = model<IPondDocument>(
  'Pond',
  PondSchema,
  'pond'
)