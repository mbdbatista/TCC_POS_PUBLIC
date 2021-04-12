import { Schema, model, Document } from 'mongoose'
import { Profile } from '../../../1-domain/entities/profile'

export interface IProfileDocument extends Profile, Document {
  id: string
}

const ProfileSchema = new Schema<IProfileDocument>({
  name: { type: String, required: true },
  active: { type: Boolean, required: true },
  actions: [
    {
      route: { type: String, required: true },
      access: { type: String, required: true }
    }
  ]
})

export const ProfileModel = model<IProfileDocument>(
  'Profile',
  ProfileSchema,
)