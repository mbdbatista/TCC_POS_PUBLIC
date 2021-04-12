import { Pond } from "../pond";
import { FishSpecie } from "./fishSpecies";

export interface FishBreeding {
  id: string
  fishSpecie: string | FishSpecie
  pond: string | Pond
  quantity: number
  createdDate: Date
  endDate?: Date
  userId: string
}