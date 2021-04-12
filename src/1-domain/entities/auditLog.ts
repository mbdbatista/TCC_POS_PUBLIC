import { User } from "./user";

export interface AuditLog {
  id: string
  event: eventType
  userId?: string | User
  createdDate: Date
}

export enum eventType {
  user_created = "user_created",
  fish_specie_created = "fish_specie_created",
  pond_created = "pond_created",
  fish_breeding_started = "fish_breeding_started",
  fish_breeding_finished = "fish_breeding_finished"
}