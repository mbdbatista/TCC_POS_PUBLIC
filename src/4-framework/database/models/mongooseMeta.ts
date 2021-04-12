import { Document, model, Schema } from "mongoose";


export interface IMongooseMetaDocument extends Document {
  name: string
  createdDate: Date
}

const MongooseMetaSchema = new Schema<IMongooseMetaDocument>({
  name: { type: String, required: true },
  createdDate: { type: Date, required: true }
})

export const MongooseMetaModel = model<IMongooseMetaDocument>(
  'MongooseMeta',
  MongooseMetaSchema
)