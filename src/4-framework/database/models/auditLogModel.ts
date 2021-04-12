import { Schema, Document, model } from "mongoose"
import { AuditLog } from "../../../1-domain/entities/auditLog"

export interface IAuditLogDocument extends AuditLog, Document {
  id: string
}

const AuditLogSchema = new Schema<IAuditLogDocument>({
  event: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: false, ref: 'users' },
  createdDate: { type: Date, required: true },
})

export const AuditLogModel = model<IAuditLogDocument>(
  'AuditLog',
  AuditLogSchema,
  'AuditLog'
)