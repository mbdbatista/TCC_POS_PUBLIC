import { Schema, model, Document, Types } from 'mongoose'
import { User } from '../../../1-domain/entities/user'

interface userDocument extends User, Document {
  id: string
}

const userSchema = new Schema<userDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: false },
  birthDate: { type: Date, required: false },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  profile: { type: Schema.Types.ObjectId, required: false, ref: 'Profile' }
})

export const UserModel = model(
  "User",
  userSchema  
)